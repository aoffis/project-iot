from machine import I2C, Pin
import machine, time
import os
from bh1750fvi import BH1750FVI
import socket
import time
import struct
from network import LoRa

def light_sensor():
    i2c = I2C(0, I2C.MASTER, baudrate=100000)
    light_sensor = BH1750FVI(i2c, addr=i2c.scan()[0])
    data = light_sensor.read()
    return(data)

time.sleep(2)
def calSOC(voltage):
    batmin = 3.15
    batmax = 4.2
    soc = (voltage-batmin)/(batmax-batmin)*100
    if (soc > 100):
        soc = 100
    if (soc < 0):
        soc = 0
    return("%3.2f" %(soc))

def voltage():
    sum = 0
    voltage = 0.0
    adc = machine.ADC()
    for i in range(501):
        apin = adc.channel(attn=adc.ATTN_11DB, pin='P16')
        bat = apin.voltage()*3  #expansionboard 2.0 115K / 56K, ratio =~ 1:3
        sum += bat
        time.sleep(0.01)
    voltage = (sum/1000)/500
    return(voltage)

time.sleep(0.5)

def moist_sensor():
    relay = Pin('P12', mode=Pin.OUT)
    adc = machine.ADC()             # create an ADC object
    apin1 = adc.channel(pin='P13',attn=adc.ATTN_11DB)   # create an analog pin on P13
    apin2= adc.channel(pin='P14',attn=adc.ATTN_11DB)   # create an analog pin on P14
    val1 = apin1()                    # read an analog value
    val2 = apin2()                    # read an analog value

    moisture1 = (val1/4095) #with Funduino
    moisture2 = (val2/4095) #with Funduino
    avg_moisture_percent = ((moisture1 + moisture2)/2)*100
    lst_moist = ["%3.2f" %(moisture1*100), "%3.2f" %(moisture2*100), "%3.2f" %(avg_moisture_percent)]
    return(lst_moist)
time.sleep(0.5)


def pump():
    relay = Pin('P12', mode=Pin.OUT)
    light = light_sensor()
    moist_lst = moist_sensor()
    moist = moist_lst[2]


    if 1000 <= float(light) <= 35000 and 0 <= float(moist) <= 40:
        relay.value(1)
        pump_status = "on"
    else:
        relay.value(0)
        pump_status = "off"

    return(pump_status)
time.sleep(0.5)

def lora():
    # A basic package header, B: 1 byte for the deviceId, B: 1 byte for the pkg size
    _LORA_PKG_FORMAT = "BB%ds"
    _LORA_PKG_ACK_FORMAT = "BBB"
    DEVICE_ID = 0x01

    # Open a Lora Socket, use tx_iq to avoid listening to our own messages
    # Please pick the region that matches where you are using the device:
    # Asia = LoRa.AS923
    # Australia = LoRa.AU915
    # Europe = LoRa.EU868
    # United States = LoRa.US915
    lora = LoRa(mode=LoRa.LORA, tx_iq=True, power_mode=LoRa.ALWAYS_ON, region=LoRa.AS923)
    lora_sock = socket.socket(socket.AF_LORA, socket.SOCK_RAW)
    lora_sock.setblocking(False)

    max_time_waiting=50 #periods
    pause_time=300 #ms
    while(True):
        light = light_sensor()
        moist_lst = moist_sensor()
        pump_status = pump()
        vbat = voltage()
        soc = calSOC(vbat)

        moist1 = moist_lst[0]
        moist2 = moist_lst[1]
        moist_avg_percent = moist_lst[2]


        # Package send containing a simple string
        # msg = str(moist)
        msg = str(light) + " " + str(moist1)+ " "+ str(moist2) + " " + str(moist_avg_percent) +  " "+ str(pump_status) + " " + str(soc)
        print(msg)
        # msg = str(moist)
        pkg = struct.pack(_LORA_PKG_FORMAT % len(msg), DEVICE_ID, len(msg), msg)
        # pkg2 = struct.pack(_LORA_PKG_FORMAT % len(msg2), DEVICE_ID, len(msg2), msg2)
        lora_sock.send(pkg)
        # lora_sock.send(pkg2)

        # Wait for the response from the gateway. NOTE: For this demo the device does an infinite loop for while waiting the response. Introduce a max_time_waiting for you application
        waiting_ack = True
        time_waiting = max_time_waiting
        while(waiting_ack):
            time_waiting = time_waiting-1
            recv_ack = lora_sock.recv(256)
            if (len(recv_ack) > 0):
                device_id, pkg_len, ack = struct.unpack(_LORA_PKG_ACK_FORMAT, recv_ack)
                if (device_id == DEVICE_ID):
                    if (ack == 200):
                        waiting_ack = False
                        print(msg)
                        print("ACK")
                    else:
                        waiting_ack = False
                        print("Message Failed")
            else:
                    if(time_waiting <= 0):
                        waiting_ack = False
                        print("Message Lost")
                    else:
                        time.sleep(pause_time/1000)
        time.sleep(60*5)

lora()
# pump()
# light_sensor()
# moist_sensor()
# moist_test()
# temp_sensor()

from machine import I2C, Pin
import machine, time
import os
from bh1750fvi import BH1750FVI
import socket
import time
import struct
from network import LoRa

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

time.sleep(1)

def temp_sensor():
    adc = machine.ADC(0)
    adc.init(bits=12)
    adc.vref(1100)
    apin = adc.channel(pin='P13', attn=adc.ATTN_11DB)  # create an analog pin on P14
    value = apin()
    transform = (5*1100/4096)/10  #(+Vcc * 1100 / 4096) / 10
    temp = value*transform

    return("%3.2f" %(temp))

def lora():
    # A basic package header, B: 1 byte for the deviceId, B: 1 byte for the pkg size
    _LORA_PKG_FORMAT = "BB%ds"
    _LORA_PKG_ACK_FORMAT = "BBB"
    DEVICE_ID = 0x02

    # Open a Lora Socket, use tx_iq to avoid listening to our own messages
    # Please pick the region that matches where you are using the device:
    # Asia = LoRa.AS923
    # Australia = LoRa.AU915
    # Europe = LoRa.EU868
    # United States = LoRa.US915
    lora = LoRa(mode=LoRa.LORA, tx_iq=True, power_mode=LoRa.ALWAYS_ON, region=LoRa.AS923)
    lora_sock = socket.socket(socket.AF_LORA, socket.SOCK_RAW)
    lora_sock.setblocking(False)

    max_time_waiting=5 #periods
    pause_time=300 #ms
    while(True):
        temp = temp_sensor()
        vbat = voltage()
        soc = calSOC(vbat)
        # Package send containing a simple string
        msg = str(temp) + " " +str(soc)
        print(msg)
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
# temp_sensor()

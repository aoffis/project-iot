import socket
import os
import struct
from network import LoRa
import json
import pycom


from network import WLAN
import time
import machine


# A basic package header, B: 1 byte for the deviceId, B: 1 byte for the pkg size, %ds: Formatted string for string
_LORA_PKG_FORMAT = "!BB%ds"
# A basic ack package, B: 1 byte for the deviceId, B: 1 byte for the pkg size, B: 1 byte for the Ok (200) or error messages
_LORA_PKG_ACK_FORMAT = "BBB"

# Open a LoRa Socket, use rx_iq to avoid listening to our own messages
# Please pick the region that matches where you are using the device:
# Asia = LoRa.AS923
# Australia = LoRa.AU915
# Europe = LoRa.EU868
# United States = LoRa.US915
lora = LoRa(mode=LoRa.LORA, rx_iq=True, power_mode=LoRa.ALWAYS_ON, region=LoRa.AS923)
lora_sock = socket.socket(socket.AF_LORA, socket.SOCK_RAW)
lora_sock.setblocking(False)
node1 = {'light': 0, 'moist1': 0, 'moist2': 0,'avg_moisture_percent': 0, 'pump': "", "soc" : 0, "datetime" : ""}
node2 = {'temp': 0,'soc': 0, "datetime" : ""}


# connect wifi
wlan = WLAN(mode=WLAN.STA)
wlan.connect("TrueGigatexFiber_2.4G_NYD", auth=(WLAN.WPA2, "mt37AcMa"), timeout=5000)

while not wlan.isconnected():
    machine.idle()
print("Connected to WiFi\n")

#firebase example
import lib.ufirebase as firebase
firebase.setURL("https://fir-auth-2efb3-default-rtdb.asia-southeast1.firebasedatabase.app/") #Aof
# firebase.setURL("https://automatic-watering-syste-48ab0-default-rtdb.asia-southeast1.firebasedatabase.app/") #ton

# client = MQTTClient("2383e9c2-f257-4b93-a76f-9673905acd92", server="broker.netpie.io",user="YbavVhXVA3nj2SjVcDBHiUETnPcCRxxF", password="-)EYkgzVULLaaO6T8TCksT-cM1f0jxt*", port=1883)

# client.set_callback(sub_cb)
# client.connect()
# client.subscribe(topic="youraccount/feeds/lights")

while (True):
    try:
        recv_pkg = lora_sock.recv(512)
        if (len(recv_pkg) > 2):
            recv_pkg_len = recv_pkg[1]

            device_id, pkg_len, msg = struct.unpack(_LORA_PKG_FORMAT % recv_pkg_len, recv_pkg)
            # device_id, pkg_len, msg2 = struct.unpack(_LORA_PKG_FORMAT % recv_pkg_len, recv_pkg)
            # print(type(msg))
            print('Device: %d - Pkg:  %s' % (device_id, msg.decode("utf-8")))
            # print('Device: %d -    light:  %s lux' % (device_id, msg))
            # val = str(msg)
            # int_val = str(val.split('b', "'"))
            # print(int_val)
            # print(msg.decode("utf-8"), "lux") #convert bytes to string
            rtc = machine.RTC()
            rtc.ntp_sync("0.th.pool.ntp.org")
            while not rtc.synced():
                machine.idle()
            print("RTC synced with NTP time")
            #adjust your local timezone, by default, NTP time will be GMT
            time.timezone(7*60*60) #we are located at GMT+2, thus 2*60*60
            date_time = time.localtime()
            date_time = ("%4d-%02d-%02d %02d:%02d:%02d" % (time.localtime()[:6]))
            str_msg = msg.decode("utf-8").split() #convert bytes to string
            if device_id == 1:
                node1['light'] = float(str_msg[0])
                node1['moist1'] = float(str_msg[1])
                node1['moist2'] = float(str_msg[2])
                node1['avg_moisture_percent'] = float(str_msg[3])
                node1['pump'] = str(str_msg[4])
                node1['soc'] = str(str_msg[5])
                node1['datetime'] = str(date_time)
            elif device_id == 2:
                node2['temp'] = float(str_msg[0])
                node2['soc'] = float(str_msg[1])
                node2['datetime'] = str(date_time)
            else:
                pass
            print(node1)
            print(node2)

            #Put to firebase
            firebase.put("Data/node1", node1, bg=0)
            firebase.put("Data/node2", node2, bg=0)


            ack_pkg = struct.pack(_LORA_PKG_ACK_FORMAT, device_id, 1, 200)
            # print(ack_pkg)
            lora_sock.send(ack_pkg)
    except (ValueError, TypeError):
        # pycom.bootmgr(safeboot=True)
        machine.reset()

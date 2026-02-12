def DatosSmartIoT():
    ESP8266_IoT.set_smart_iot_upload_data(Environment.read_light_intensity(AnalogPin.P0),
        Environment.octopus_BME280(Environment.BME280_state.BME280_TEMPERATURE_C),
        Environment.octopus_BME280(Environment.BME280_state.BME280_HUMIDITY),
        Environment.octopus_BME280(Environment.BME280_state.BME280_PRESSURE))
    ESP8266_IoT.upload_smart_iot_data()

def on_iot_switch_smart_state_off():
    basic.show_icon(IconNames.NO)
ESP8266_IoT.iot_switch_event(ESP8266_IoT.SmartIotSwitchState.OFF,
    on_iot_switch_smart_state_off)

def DatosOLED():
    OLED.clear()
    OLED.new_line()
    OLED.write_string("Luminosidad: ")
    OLED.write_num_new_line(Environment.read_light_intensity(AnalogPin.P1))
    OLED.new_line()
    OLED.write_string("Temperatura: ")
    OLED.write_num_new_line(Environment.octopus_BME280(Environment.BME280_state.BME280_TEMPERATURE_C))
    OLED.new_line()
    OLED.write_string("Humedad    : ")
    OLED.write_num_new_line(Environment.octopus_BME280(Environment.BME280_state.BME280_HUMIDITY))
    OLED.new_line()
    OLED.write_string("Presion    : ")
    OLED.write_num_new_line(Environment.octopus_BME280(Environment.BME280_state.BME280_PRESSURE))

def on_iot_switch_smart_state():
    basic.show_icon(IconNames.YES)
ESP8266_IoT.iot_switch_event(ESP8266_IoT.SmartIotSwitchState.ON,
    on_iot_switch_smart_state)

basic.show_icon(IconNames.SAD)
ESP8266_IoT.init_wifi(SerialPin.P8, SerialPin.P12, BaudRate.BAUD_RATE115200)
while ESP8266_IoT.wifi_state(False):
    ESP8266_IoT.connect_wifi("DIGIFIBRA-AKHH", "SKtkPPXYRHKs")
OLED.init(128, 64)

def on_forever():
    while ESP8266_IoT.smartiot_state(False):
        basic.show_icon(IconNames.HEART)
        ESP8266_IoT.connect_smartiot("qokJCxP2vy9pWuTAGYvc", "1")
        DatosSmartIoT()
        basic.show_icon(IconNames.SMALL_HEART)
        DatosOLED()
    basic.show_icon(IconNames.HAPPY)
basic.forever(on_forever)

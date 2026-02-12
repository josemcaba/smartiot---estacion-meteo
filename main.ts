function DatosSmartIoT () {
    ESP8266_IoT.setSmartIotUploadData(
    Environment.ReadLightIntensity(AnalogPin.P0),
    Environment.octopus_BME280(Environment.BME280_state.BME280_temperature_C),
    Environment.octopus_BME280(Environment.BME280_state.BME280_humidity),
    Environment.octopus_BME280(Environment.BME280_state.BME280_pressure)
    )
    ESP8266_IoT.uploadSmartIotData()
}
ESP8266_IoT.iotSwitchEvent(ESP8266_IoT.SmartIotSwitchState.off, function () {
    basic.showIcon(IconNames.No)
})
function DatosOLED () {
    OLED.clear()
    OLED.newLine()
    OLED.writeString("Luminosidad: ")
    OLED.writeNumNewLine(Environment.ReadLightIntensity(AnalogPin.P1))
    OLED.newLine()
    OLED.writeString("Temperatura: ")
    OLED.writeNumNewLine(Environment.octopus_BME280(Environment.BME280_state.BME280_temperature_C))
    OLED.newLine()
    OLED.writeString("Humedad    : ")
    OLED.writeNumNewLine(Environment.octopus_BME280(Environment.BME280_state.BME280_humidity))
    OLED.newLine()
    OLED.writeString("Presion    : ")
    OLED.writeNumNewLine(Environment.octopus_BME280(Environment.BME280_state.BME280_pressure))
}
ESP8266_IoT.iotSwitchEvent(ESP8266_IoT.SmartIotSwitchState.on, function () {
    basic.showIcon(IconNames.Yes)
})
basic.showIcon(IconNames.Sad)
ESP8266_IoT.initWIFI(SerialPin.P8, SerialPin.P12, BaudRate.BaudRate115200)
while (ESP8266_IoT.wifiState(false)) {
    ESP8266_IoT.connectWifi("DIGIFIBRA-AKHH", "SKtkPPXYRHKs")
}
OLED.init(128, 64)
basic.forever(function () {
    while (ESP8266_IoT.smartiotState(false)) {
        DatosOLED()
        basic.showIcon(IconNames.Heart)
        ESP8266_IoT.connectSmartiot("qokJCxP2vy9pWuTAGYvc", "1")
        basic.showIcon(IconNames.SmallHeart)
    }
    DatosOLED()
    DatosSmartIoT()
    basic.showIcon(IconNames.Happy)
    basic.pause(30000)
})

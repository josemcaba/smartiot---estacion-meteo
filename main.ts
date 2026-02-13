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
function DatosThingSpeak () {
    ESP8266_IoT.connectThingSpeak()
    ESP8266_IoT.setData(
    "UB7P9WBTAV6HAOY0",
    Environment.ReadLightIntensity(AnalogPin.P1),
    Environment.octopus_BME280(Environment.BME280_state.BME280_temperature_C),
    Environment.octopus_BME280(Environment.BME280_state.BME280_humidity),
    Environment.octopus_BME280(Environment.BME280_state.BME280_pressure)
    )
    ESP8266_IoT.uploadData()
}
OLED.init(128, 64)
OLED.clear()
basic.showIcon(IconNames.Sad)
ESP8266_IoT.initWIFI(SerialPin.P8, SerialPin.P12, BaudRate.BaudRate115200)
while (ESP8266_IoT.wifiState(false)) {
    ESP8266_IoT.connectWifi("DIGIFIBRA-AKHH", "SKtkPPXYRHKs")
}
basic.forever(function () {
    basic.showIcon(IconNames.Confused)
    DatosOLED()
    while (ESP8266_IoT.thingSpeakState(false)) {
        basic.showIcon(IconNames.Heart)
        ESP8266_IoT.connectThingSpeak()
        basic.showIcon(IconNames.SmallHeart)
    }
    DatosThingSpeak()
    basic.showIcon(IconNames.Happy)
    basic.pause(60000)
})

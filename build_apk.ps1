$env:ANDROID_HOME="C:\Users\LENOVO\Android"
$env:PATH="$env:ANDROID_HOME\cmdline-tools\latest\bin;$env:PATH"

cmd.exe /c "echo y | C:\Users\LENOVO\Android\cmdline-tools\latest\bin\sdkmanager.bat --licenses"
C:\Users\LENOVO\Android\cmdline-tools\latest\bin\sdkmanager.bat "platform-tools" "platforms;android-34" "build-tools;34.0.0"

Set-Location "c:\Users\LENOVO\OneDrive\Desktop\mobile-inventory-system\InventoryApp_Part3\android"
.\gradlew assembleDebug --no-daemon

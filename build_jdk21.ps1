Stop-Process -Name "java" -Force -ErrorAction SilentlyContinue;

$jdkDir = "$env:USERPROFILE\Java21";
if (!(Test-Path $jdkDir)) { New-Item -ItemType Directory -Path $jdkDir };

$url = "https://aka.ms/download-jdk/microsoft-jdk-21.0.2-windows-x64.zip";
$zip = "$jdkDir\jdk21.zip";
if (!(Test-Path $zip)) { Invoke-WebRequest -Uri $url -OutFile $zip };

Expand-Archive -Path $zip -DestinationPath $jdkDir -Force;
$env:JAVA_HOME = Get-ChildItem -Path "$jdkDir\jdk-*" | Select-Object -First 1 -ExpandProperty FullName;
$env:PATH = "$env:JAVA_HOME\bin;$env:PATH";

cd C:\Users\LENOVO\OneDrive\Desktop\mobile-inventory-system\InventoryApp_Part3\android;
.\gradlew clean;
.\gradlew assembleDebug --no-daemon;

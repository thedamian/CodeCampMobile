@echo off
Set BlackberryWebWorks="C:\Program Files (x86)\Research In Motion\BlackBerry WebWorks SDK 2.3.1.5"
CLS
del /q *.zip
del /s /q app\*

"C:\Program Files\7-Zip\7z.exe"  a %1.zip * -x!.git -x!images -x!google28917ba3591a728d.html -x!.gitignore -x!package.json -x!send.html -x!app.js -x!IISNode.yml -x!c.bat

%BlackberryWebWorks%\bbwp %1.zip -v -o app -g  
REM -d for debug in web inspector
pause
%BlackberryWebWorks%\bin\JavaLoader.exe  load app\StandardInstall\%1.cod
pause
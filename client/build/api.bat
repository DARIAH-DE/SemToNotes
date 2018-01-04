
.\lib\jsdoc\jsdoc -r -p ^
-d .\api\drawing\full .\src ^
-c .\build\api.conf ^
&& ^
xcopy .\api\drawing\full .\api\drawing\simple /E ^
&& ^
.\lib\jsdoc\jsdoc -r ^
-d .\api\drawing\simple .\src ^
-c .\build\api.conf

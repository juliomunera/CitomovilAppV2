
 DROP TABLE IF EXISTS SettingsData;

CREATE TABLE SettingsData (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    PhoneNumber VARCHAR(20) NULL,
	CodeNumber VARCHAR(20) NULL,
    ClientID VARCHAR(20) NULL,
	ApplicationID VARCHAR(20) NULL,
	DeviceID VARCHAR(20) NULL,
	ProjectID VARCHAR(20) NULL,
    DoormanPhoneNumber VARCHAR(20) NULL,
    Token VARCHAR(20) NULL	
);
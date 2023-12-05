SET FOREIGN_KEY_CHECKS = 0;
CREATE TABLE `USER` (
                        `USER_ID`	INT	NOT NULL AUTO_INCREMENT PRIMARY KEY,
                        `LOGIN_ID`	VARCHAR(10)	NOT NULL,
                        `PASSWORD`	VARCHAR(10)	NOT NULL,
                        `USER_NAME`	VARCHAR(50)	NOT NULL,
                        `PHONE_NUMBER`	VARCHAR(50)	NOT NULL,
                        `EMAIL`	VARCHAR(50)	NOT NULL,
                        `CATEGORY`	VARCHAR(50)	NOT NULL,
                        `DEPARTMENT`	VARCHAR(50)	NOT NULL,
                        `APPROVAL`	VARCHAR(10)	NOT NULL	DEFAULT FALSE,
                        `SIGN_UP_TIME`	TIMESTAMP	NOT NULL
);

CREATE TABLE `PATIENT` (
                           `PATIENT_ID`	INT	NOT NULL AUTO_INCREMENT PRIMARY KEY,
                           `USER_ID`	INT	NOT NULL,
                           `PATIENT_NAME`	VARCHAR(50)	NULL,
                           `GENDER`	VARCHAR(10)	NOT NULL,
                           `AGE`	    INT	    NULL,
                           `ADDRESS`	VARCHAR(50)	NOT NULL,
                           `BIRTHDAY`	DATETIME	NULL,
                           `RESIDENT_REGISTRATION_NUMBER`	VARCHAR(30)	NOT NULL,
                           `PHONE_NUMBER`	VARCHAR(30)	NULL,
                           `SPECIAL_NOTE`	VARCHAR(50)	NULL,
                           `LAST_TREATMENT_DATE`	DATETIME	NULL,
                           `RESERVATION_DATE`	DATETIME	NULL,
                           FOREIGN KEY (`USER_ID`)
                               REFERENCES `USER` (`USER_ID`)
);

CREATE TABLE `PHYSICAL_INFO` (
                                 `PATIENT_ID`	INT	NOT NULL PRIMARY KEY,
                                 `HEIGHT`	DOUBLE	NULL,
                                 `WEIGHT`	DOUBLE	NULL,
                                 `BLOOD_TYPE`	VARCHAR(10)	NULL,
                                 FOREIGN KEY (`PATIENT_ID`)
                                     REFERENCES `PATIENT` (`PATIENT_ID`)
                                     ON DELETE CASCADE
);

CREATE TABLE `CHART` (
                         `CHART_ID`	INT	NOT NULL AUTO_INCREMENT PRIMARY KEY,
                         `USER_ID`	INT	NOT NULL,
                         `PATIENT_ID`	INT	NOT NULL,
                         `DATE`	TIMESTAMP	NOT NULL,
                         `DETAILS`	VARCHAR(250)	NULL,
                         `MEMO`	VARCHAR(250)	NULL,
                         `EXAMINE`	BOOLEAN	NOT NULL	DEFAULT FALSE,
                         `MEDICATION_THERAPY`	BOOLEAN	NOT NULL	DEFAULT FALSE,
                         `PHYSICAL_THERAPY`	BOOLEAN	NOT NULL	DEFAULT FALSE,
                         FOREIGN KEY (`USER_ID`)
                             REFERENCES `USER` (`USER_ID`),
                         FOREIGN KEY (`PATIENT_ID`)
                             REFERENCES `PATIENT` (`PATIENT_ID`)
                             ON DELETE CASCADE
);

CREATE TABLE `EXAMINE_DATA` (
                                `EXAMINE_DATA_ID`	INT	NOT NULL AUTO_INCREMENT PRIMARY KEY,
                                `CHART_ID`	INT	NOT NULL,
                                `USER_ID`	INT	NOT NULL,
                                `CATEGORY_1`	VARCHAR(50)	NOT NULL	COMMENT 'x-ray, 기초체력 등등',
                                `CATEGORY_2`	VARCHAR(50)	NULL	COMMENT '기초체력_근지구력 등등',
                                `EXAMINE_NAME`	VARCHAR(50)	NOT NULL,
                                `EXAMINE_DATE`	TIMESTAMP	NULL,
                                `MEMO`	VARCHAR(250)	NULL,
                                FOREIGN KEY (`USER_ID`)
                                    REFERENCES `USER` (`USER_ID`),
                                FOREIGN KEY (`CHART_ID`)
                                    REFERENCES `CHART` (`CHART_ID`)
                                    ON DELETE CASCADE
);

CREATE TABLE `EXAMINE_RESULT` (
                                  `EXAMINE_DATA_ID`	INT	NOT NULL PRIMARY KEY,
                                  `COUNT`	INT	NULL,
                                  `TEXT`	VARCHAR(50)	NULL,
                                  `PDF`	BLOB	NULL,
                                  `PHOTO`	BLOB	NULL,
                                  `VIDEO`	BLOB	NULL,
                                  `MEMO`	VARCHAR(250)	NULL,
                                  FOREIGN KEY (`EXAMINE_DATA_ID`)
                                      REFERENCES `EXAMINE_DATA` (`EXAMINE_DATA_ID`)
                                      ON DELETE CASCADE
);

CREATE TABLE `TREATMENT` (
                             `TREATMENT_ID`	INT	NOT NULL AUTO_INCREMENT PRIMARY KEY,
                             `CHART_ID`	INT	NOT NULL,
                             `USER_ID`	INT	NOT NULL,
                             `TREATMENT_NAME`	VARCHAR(30)	NULL,
                             `DATE`	TIMESTAMP	NULL,
                             `DOSAGE`	INT	NULL,
                             `SIG`	INT	NULL,
                             `DURATION`	INT	NULL,
                             `MEMO`	VARCHAR(250)	NULL,
                             FOREIGN KEY (`USER_ID`)
                                 REFERENCES `USER` (`USER_ID`),
                             FOREIGN KEY (`CHART_ID`)
                                 REFERENCES `CHART` (`CHART_ID`)
                                 ON DELETE CASCADE
);

CREATE TABLE `PHYSICAL_THERAPY_CODE` (
                                         `THERAPY_CODE`	INT	NOT NULL AUTO_INCREMENT PRIMARY KEY,
                                         `PHYSICAL_THERAPY_NAME`	VARCHAR(30)	NOT NULL,
                                         `URL_VIDEO`	VARCHAR(50)	NULL,
                                         `THERAPY_TYPE`	VARCHAR(30)	NOT NULL,
                                         `PERFORMANCE_UNIT1`	VARCHAR(10)	NOT NULL,
                                         `PERFORMANCE_UNIT2`	VARCHAR(50)	NULL
);

CREATE TABLE `PHYSICAL_THERAPY` (
                                    `PHYSICAL_THERAPY_ID`	INT	NOT NULL AUTO_INCREMENT PRIMARY KEY,
                                    `USER_ID`	INT	NOT NULL,
                                    `THERAPY_CODE`	INT	NOT NULL,
                                    `PATIENT_ID`	INT	NOT NULL,
                                    `DATE`	TIMESTAMP	NULL,
                                    `MEMO`	VARCHAR(250)	NULL,
                                    FOREIGN KEY (`USER_ID`)
                                        REFERENCES `USER` (`USER_ID`),
                                    FOREIGN KEY (`THERAPY_CODE`)
                                        REFERENCES `PHYSICAL_THERAPY_CODE` (`THERAPY_CODE`)
                                        ON DELETE CASCADE,
                                    FOREIGN KEY (`PATIENT_ID`)
                                        REFERENCES `PATIENT` (`PATIENT_ID`)
                                        ON DELETE CASCADE
);

CREATE TABLE `THERAPY_DATA_INFO` (
                                     `PHYSICAL_THERAPY_ID`	INT	NOT NULL PRIMARY KEY,
                                     `PERFORMANCE1`	VARCHAR(30)	NULL,
                                     `PERFORMANCE2`	VARCHAR(30)	NULL,
                                     `SET`	INT	NULL,
                                     `REPS`	INT	NULL,
                                     `DURATION`	DATETIME	NULL,
                                     FOREIGN KEY (`PHYSICAL_THERAPY_ID`)
                                         REFERENCES `PHYSICAL_THERAPY` (`PHYSICAL_THERAPY_ID`)
                                         ON DELETE CASCADE
);

CREATE TABLE `THERAPY_RESULT` (
                                  `PHYSICAL_THERAPY_ID`	INT	NOT NULL PRIMARY KEY,
                                  `PHOTO`	BLOB	NULL,
                                  `VIDEO`	BLOB	NULL,
                                  `MEMO`	VARCHAR(50)	NULL,
                                  FOREIGN KEY (`PHYSICAL_THERAPY_ID`)
                                      REFERENCES `PHYSICAL_THERAPY` (`PHYSICAL_THERAPY_ID`)
                                      ON DELETE CASCADE
);

CREATE TABLE `TOTAL_REPORT` (
                                `TOTAL_REPORT_ID`	INT	NOT NULL AUTO_INCREMENT PRIMARY KEY,
                                `PATIENT_ID`	INT	NOT NULL,
                                `DATA_TYPE`	VARCHAR(30)	NULL,
                                `X_UNIT`	VARCHAR(30)	NULL,
                                `START_DATE`	DATETIME	NULL,
                                `END_DATE`	DATETIME	NULL,
                                `X_INTERVAL`	INT	NULL,
                                `Y_UNIT`	VARCHAR(30)	NULL,
                                FOREIGN KEY (`PATIENT_ID`)
                                    REFERENCES `PATIENT` (`PATIENT_ID`)
                                    ON DELETE CASCADE
);

CREATE TABLE `SURVEY` (
                          `SURVEY_ID`	INT	NOT NULL AUTO_INCREMENT PRIMARY KEY,
                          `DATE`	TIMESTAMP	NULL,
                          `Q_NUMBER`	INT	NULL,
                          `ANSWER`	INT	NULL,
                          `PATIENT_ID`	INT	NOT NULL,
                          FOREIGN KEY (`PATIENT_ID`)
                              REFERENCES `PATIENT` (`PATIENT_ID`)
                              ON DELETE CASCADE
);

CREATE TABLE `session` (
                           `session_id`	varchar(128)	NOT NULL PRIMARY KEY,
                           `expires`	int unsigned	NOT NULL,
                           `data`	mediumtext	NULL
);

CREATE TABLE `IN_BODY` (
                           `EXAMINE_DATA_ID`	INT	NOT NULL PRIMARY KEY,
                           `SKELETAL_MUSCLE_MASS`	DOUBLE	NULL,
                           `BODY_FAT_MASS`	DOUBLE	NULL,
                           `BMI`	DOUBLE	NULL,
                           `PERCENT_BODY_FAT`	DOUBLE	NULL,
                           FOREIGN KEY (`EXAMINE_DATA_ID`)
                               REFERENCES `EXAMINE_DATA` (`EXAMINE_DATA_ID`)
                               ON DELETE CASCADE
);
SET FOREIGN_KEY_CHECKS = 1;
// Specontroller
// by 
// Ganesh Gopal, Debanjum Singh Solanky

// Uses the Wire library
// Writes data to an I2C/TWI slave device

// Created 12th November 2013

// This code is in the public domain.


#include <Wire.h>
#define MCP4726_CMD_WRITEDAC            (0x40)  // Writes data to the MCP4725 DAC
#define MCP4726_CMD_WRITEDACEEPROM      (0x60)  // Writes data to the DAC and the EEPROM (persisting the assigned value after reset)

//Analog output array
double CONTROL_VOLT [143] = 
{
2.4546666667, 2.4386666667, 2.4236666667, 2.41, 2.3973333333,
2.385, 2.373, 2.361, 2.35, 2.3393333333, 2.3293333333, 
2.3196666667, 2.31, 2.3003333333, 2.2903333333, 2.2803333333, 
2.271,2.263, 2.2553333333, 2.2476666667, 2.2396666667, 2.23, 
2.2236666667, 2.215, 2.2066666667, 2.198, 2.1896666667, 
2.1813333333, 2.1733333333, 2.1653333333, 2.1573333333, 
2.1493333333, 2.1416666667, 2.1343333333, 2.1266666667, 
2.1193333333, 2.1123333333, 2.1053333333, 2.0986666667, 
2.092, 2.0853333333, 2.0786666667, 2.0723333333, 2.066, 2.0596666667, 
2.0536666667, 2.0473333333, 2.0413333333, 2.035, 2.029, 2.023, 
2.0173333333, 2.0113333333, 2.0056666667, 2, 1.9943333333, 
1.9886666667, 1.983, 1.977, 1.971, 1.9646666667, 1.958, 
1.9513333333, 1.9443333333, 1.9373333333, 1.93, 1.923, 
1.9156666667, 1.9083333333, 1.901, 1.894, 1.887, 1.88, 1.873, 
1.8663333333, 1.8596666667, 1.853, 1.8466666667, 1.8403333333, 
1.8343333333, 1.8283333333, 1.8226666667, 1.8166666667, 1.8106666667, 
1.8043333333, 1.7976666667, 1.7906666667, 1.7836666667, 1.7763333333, 
1.7686666667, 1.761, 1.7533333333, 1.7456666667, 1.738, 1.73, 1.7223333333, 
1.7143333333, 1.7063333333, 1.6983333333, 1.69, 1.6813333333, 1.6723333333, 
1.663, 1.6536666667, 1.6436666667, 1.6336666667, 1.623, 1.612, 1.6006666667, 
1.5886666667, 1.5763333333, 1.5636666667, 1.5506666667, 1.5373333333, 1.5236666667, 
1.5093333333, 1.494, 1.4773333333, 1.4596666667, 1.4403333333, 1.4203333333, 
1.3993333333, 1.3776666667, 1.3563333333, 1.335, 1.3146666667, 1.2943333333, 
1.274, 1.2543333333, 1.2343333333, 1.2146666667, 1.1946666667, 1.1743333333, 
1.154, 1.1333333333, 1.1133333333, 1.0936666667, 1.0746666667, 1.0566666667, 
1.0396666667, 1.0236666667, 1.0083333333, 0.9936666667
};

int WAVELENGTH [143] = 
{
1200, 1205, 1210, 1215, 1220, 1225, 1230, 1235, 1240, 1245, 1250, 
1255, 1260, 1265, 1270, 1275, 1280, 1285, 1290, 1295, 1300, 1305, 
1310, 1315, 1320, 1325, 1330, 1335, 1340, 1345, 1350, 1355, 1360, 
1365, 1370, 1375, 1380, 1385, 1390, 1395, 1400, 1405, 1410, 1415, 
1420, 1425, 1430, 1435, 1440, 1445, 1450, 1455, 1460, 1465, 1470, 
1475, 1480, 1485, 1490, 1495, 1500, 1505, 1510, 1515, 1520, 1525, 
1530, 1535, 1540, 1545, 1550, 1555, 1560, 1565, 1570, 1575, 1580, 
1585, 1590, 1595, 1600, 1605, 1610, 1615, 1620, 1525, 1630, 1635, 
1640, 1645, 1650, 1655, 1660, 1665, 1670, 1675, 1680, 1685, 1690, 
1695, 1700, 1705, 1710, 1715, 1720, 1725, 1730, 1735, 1740, 1745, 
1750, 1755, 1760, 1765, 1770, 1775, 1780, 1785, 1790, 1795, 1800, 
1805, 1810, 1815, 1820, 1825, 1830, 1835, 1840, 1845, 1850, 1855, 
1860, 1865, 1870, 1875, 1880, 1885, 1890, 1895, 1900, 1905, 1910
};

int VCOD [143];
double DAC_VREF = 3.3                                   ;
int DAC_RES = 4096                                      ;
double ADC_VREF = 5                                     ;
int ADC_RES = 1024                                      ;

char messageBuffer[12]                                  ;
int cmdid                                               ;
char cmd[3], dat[9]                                     ;
int index=0                                             ;
bool debug = true                                       ;

int SCAN_SIZE = 143                                     ;
int si = 0, ei = 0                                      ;
bool SPEC_RESET = false                                 ;

/*--------------------------------------------------------------------------------------------------------------------------------*/
/*                                                                    PROGRAM STARTS                                              */
/*--------------------------------------------------------------------------------------------------------------------------------*/
void setup()
{                                
  Wire.begin()               ;                   // Join I2C Bus (address optional for master)
  Serial.begin(57600)        ; 
  pinMode(A0, INPUT)         ;  
}

void loop()
{
  while(Serial.available() > 0) 
  {    
    char x = Serial.read();
    if ( debug == true ){ Serial.println("got"); }
    if (x == '#') index = 0;         // start
    else if (x == '.') process();    // end
    else messageBuffer[index++] = x;
  }
  
}

void process()
{
  index = 0;
  
  if (debug == true) { Serial.println("process"); }
  
  strncpy(cmd, messageBuffer, 1);
  cmd[2] = '\0';
  strncpy(dat, messageBuffer + 2, 9);
  dat[8] = '\0';    

  cmdid = atoi(cmd);
    
  switch(cmdid) {
   
    case 0: initialize();        break;
    case 1: drivespectrometer(); break;
    case 2: reset();             break;
    default: break;
  }
}

void initialize()
{
  int i = 0 ;
  int swave = 0 , ewave = 0 ;
  char temp[5];
  
  if (debug == true) { Serial.println("init"); }
  SPEC_RESET = false;
  
  strncpy(temp, dat , 4);
  temp[4] = '\0';
  swave = atoi (temp);
  strncpy(temp, dat + 4, 4);
  temp[4] = '\0';
  ewave = atoi (temp);
  
  for ( i = 0 ; i < SCAN_SIZE ; i++ )                        // Find the Start Wavelength and End Wavelength
  {
    if (WAVELENGTH[i] == swave) si = i ;
    if (WAVELENGTH[i] == ewave) ei = i ;
  }
  
  for ( i = si ; i <= ei ; i++ )                             // Generate the Whole set of Wavelengths within the given Start Wavelength and End Wavelength
  {
  VCOD[i-si] = int((CONTROL_VOLT[i]/DAC_VREF)*DAC_RES) ;
  }

      if (debug == true) { Serial.println(VCOD[si]); Serial.println(VCOD[ei]); }

}

void setVoltage( uint16_t output)
{
  uint8_t twbrback = TWBR;                   // Backup the Contents of TWBR Register.
  byte Addr = 0x60;                          // Address of DAC
  TWBR = 12;                                 // 400 khz
    
  //Writing Address Byte to DAC
  Wire.beginTransmission(Addr);
  
  //Writing Command Byte to DAC
  Wire.write(MCP4726_CMD_WRITEDAC);
  
  //Writing Data Byte to DAC
  Wire.write(output / 16);                   // Upper data bits          (D11.D10.D9.D8.D7.D6.D5.D4)
  Wire.write((output % 16) << 4);            // Lower data bits          (D3.D2.D1.D0.x.x.x.x)
  
  //Ending I2C Data Transmission
  Wire.endTransmission();
  
  TWBR = twbrback;
}

void drivespectrometer()
{
  int i = 0 ,j = 0       ; 
  double AI = 0.0         ;
  int navg = 150          ;
  char m[12];
  
   //Writing LookUpTable Data to DAC
   
  if (debug == true) { Serial.println("drive"); Serial.print("RESET: "); Serial.println(SPEC_RESET); }
  
  if (SPEC_RESET == true) { SPEC_RESET = false; Serial.print("RESET: "); Serial.println(SPEC_RESET); }


  while ( (si == ei) && (Serial.available() <= 0 ) && (SPEC_RESET != true) ) //if start, end wavelength are same then bandwidth 0, so only 1 wavelength scanned
  {
    setVoltage(VCOD[si]);
    delay(10);    
    Serial.print("A" );
    Serial.print(float((analogRead(A0)*ADC_VREF)/ADC_RES),3);    
    Serial.print("B" );
  }

  if (si != ei)
  {
    for (i = si; (i <= ei)&&(SPEC_RESET != true) ; i++)
    {
      setVoltage(VCOD[i-si]);
      delay(10);      
      for ( j = 0 ; j < navg ; j++ )
      {
        AI = AI + analogRead(A0);
        delayMicroseconds(500);
      }
      AI = AI/navg ;               
      
      Serial.print("A" );
//      sprintf(m, "%.05f",  );
      Serial.print((AI*ADC_VREF/ADC_RES),5);
      Serial.print("B" );
      delay(1000);            
      
      AI = 0.0 ;
    }
  }  
}

void reset ()
{
  if ( debug == true ) { Serial.println("RESET"); }
  SPEC_RESET = true ;
  setVoltage(0);
}


export const farmData ={
  "farmer_id": "user_one",
  "setup": "SETUP A",
  "timestamp": "2025-06-13T12:27:00+03:00",
  "soil_health": {
    "current": {
      "ph": 7.5,
      "nitrogen": 25.3,
      "phosphorus": 15.7,
      "potassium": 20.1,
      "moisture": 45.2,
      "temperature": 23.8
    },
    "historical": [
      {
        "timestamp": "2025-06-13T00:00:00+03:00",
        "ph": 6.4,
        "nitrogen": 24.8,
        "phosphorus": 15.5,
        "potassium": 19.8,
        "moisture": 44.0,
        "temperature": 22.5
      },
      {
        "timestamp": "2025-06-12T00:00:00+03:00",
        "ph": 6.6,
        "nitrogen": 25.0,
        "phosphorus": 16.0,
        "potassium": 20.5,
        "moisture": 46.1,
        "temperature": 24.0
      },
      {
        "timestamp": "2025-06-11T00:00:00+03:00",
        "ph": 6.3,
        "nitrogen": 24.5,
        "phosphorus": 15.2,
        "potassium": 19.5,
        "moisture": 43.8,
        "temperature": 23.0
      }
    ]
  },
  "environmental_conditions": {
    "current": {
      "temperature": 26.5,
      "humidity": 65.0,
      "rainfall_detected": false
    },
    "historical": [
      {
        "timestamp": "2025-06-13T00:00:00+03:00",
        "temperature": 25.8,
        "humidity": 64.2,
        "rainfall_detected": false
      },
      {
        "timestamp": "2025-06-12T00:00:00+03:00",
        "temperature": 27.0,
        "humidity": 66.5,
        "rainfall_detected": true,
        "rainfall_amount_mm": 12.3
      },
      {
        "timestamp": "2025-06-11T00:00:00+03:00",
        "temperature": 26.0,
        "humidity": 63.8,
        "rainfall_detected": false
      }
    ],
    "weekly_rainfall": {
      "total_mm": 18.5,
      "days": [
        {"date": "2025-06-13", "rainfall_mm": 0.0},
        {"date": "2025-06-12", "rainfall_mm": 12.3},
        {"date": "2025-06-11", "rainfall_mm": 0.0},
        {"date": "2025-06-10", "rainfall_mm": 6.2},
        {"date": "2025-06-09", "rainfall_mm": 0.0},
        {"date": "2025-06-08", "rainfall_mm": 0.0},
        {"date": "2025-06-07", "rainfall_mm": 0.0}
      ]
    }
  },
  "water_management": {
    "reservoir_level_percent": 75.0,
    "overhead_tank_level_percent": 60.0,
    "pump_status": "off",
    "irrigation_events": [
      {
        "timestamp": "2025-06-13T08:00:00+03:00",
        "action": "pump_on",
        "moisture_level": 40.5
      },
      {
        "timestamp": "2025-06-13T08:30:00+03:00",
        "action": "pump_off",
        "moisture_level": 45.0
      },
      {
        "timestamp": "2025-06-12T07:45:00+03:00",
        "action": "pump_on",
        "moisture_level": 39.8
      }
    ]
  },
  "animal_monitoring": {
    "animals": [
      {
        "id": "cow_001",
        "movement": {
          "latitude": -1.2921,
          "longitude": 36.8219,
          "timestamp": "2025-06-13T12:25:00+03:00"
        },
        "health": {
          "body_temperature": 38.5,
          "blood_pressure": "120/80"
        },
        "geo_fencing_alert": false
      },
      {
        "id": "cow_002",
        "movement": {
          "latitude": -1.2930,
          "longitude": 36.8225,
          "timestamp": "2025-06-13T12:25:00+03:00"
        },
        "health": {
          "body_temperature": 38.7,
          "blood_pressure": "122/82"
        },
        "geo_fencing_alert": true,
        "alert_message": "Cow_002 has exited the designated area"
      }
    ]
  },
  "weather_data": {
    "current": {
      "temperature": 26.8,
      "humidity": 64.5,
      "condition": "partly_cloudy",
      "wind_speed_kmh": 10.5
    },
    "forecast": [
      {
        "date": "2025-06-14",
        "temperature_high": 28.0,
        "temperature_low": 18.5,
        "condition": "sunny",
        "chance_of_rain": 10
      },
      {
        "date": "2025-06-15",
        "temperature_high": 27.5,
        "temperature_low": 19.0,
        "condition": "light_rain",
        "chance_of_rain": 60
      }
    ]
  },
  "notifications": [
    {
      "id": "notif_001",
      "timestamp": "2025-06-13T08:30:00+03:00",
      "message": "Pump stopped. Soil moisture reached 45%.",
      "type": "system"
    },
    {
      "id": "notif_002",
      "timestamp": "2025-06-13T12:25:00+03:00",
      "message": "Geo-fencing alert: Cow_002 has exited the designated area.",
      "type": "alert"
    },
    {
      "id": "notif_003",
      "timestamp": "2025-06-13T10:00:00+03:00",
      "message": "Check soil NPK levels for optimal fertilization.",
      "type": "admin"
    }
  ],
  "settings": {
    "data_sharing_consent": true,
    "token_balance": 50,
    "subscription_plan": "basic"
  }
}
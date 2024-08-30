<template>
  <div class="weather-container">
    <div id="weather">
      <span ref="weatherCity"></span>
      <span ref="separator1"> | </span>
      <span ref="weatherTemp"></span>
      <span ref="separator2"> | </span>
      <span ref="weatherDesc"></span>
      <span ref="weatherIcon" class="weather-icon"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Weather',
  data() {
    return {
      API_KEY: "b36c89ba35df1e3f3622608442bf7a76",
      weatherData: null,
    };
  },
  methods: {
    onGeoOk(position) {
      var self = this;
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${self.API_KEY}&units=metric`;
      fetch(url)
        .then(response => response.json())
        .then(data => {
          const weatherCity = self.$refs.weatherCity;
          const weatherTemp = self.$refs.weatherTemp;
          const weatherDesc = self.$refs.weatherDesc;
          const weatherIcon = self.$refs.weatherIcon;
          const weatherIconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
          const weatherDescription = data.weather[0].description.toUpperCase();

          weatherCity.innerText = data.name;
          weatherTemp.innerText = `${data.main.temp}°C`;
          weatherDesc.innerText = weatherDescription;
          weatherIcon.innerHTML = `<img src="${weatherIconUrl}" alt="Weather icon" style="width: 50px; height: 50px;">`;

          self.weatherData = {
            city: data.name,
            temperature: data.main.temp,
            description: weatherDescription,
            iconUrl: weatherIconUrl
          };

          self.$emit('weather-updated', self.weatherData); // 이벤트를 통해 부모 컴포넌트로 데이터 전달
        })
        .catch(error => {
          console.log("Error fetching weather data:", error);
        });
    },
    onGeoError() {
      alert("Can't find you. No weather for you.");
    },
    getCurrentPosition() {
      navigator.geolocation.getCurrentPosition(this.onGeoOk, this.onGeoError);
    }
  },
  mounted() {
    this.getCurrentPosition();
  }
};
</script>



<style scoped>
.weather-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin:0;
}

#weather {
  font-size: 15px;
  text-align: center;
  display: flex; 
  align-items: center; 
}

#weather span {
  margin-right: 10px;
}

#separator1,
#separator2 {
  margin: 0 10px;
}

.weather-icon img {
  vertical-align: middle; 
}
</style>

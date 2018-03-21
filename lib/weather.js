const loadWeather = () => {
  $l.ajax({
    url: "https://query.yahooapis.com/v1/public/yql",
    data: {
      q: "select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='manhattan, NY')",
      format: "json",
      env: "store://datatables.org/alltableswithkeys"
    },
    method: 'GET'
  }).then(res => {
    res = JSON.parse(res);
    render(res);
  });
};

const render = (res) => {
  const result = res.query.results.channel;
  const forecast = result.item.forecast;
  const today = result.item.condition;

  $l('#city').html(result.location.city);
  $l('#today').html(today.date);
  $l('#today-text').html(today.text);
  $l('#today-img').attr('src', `https://s.yimg.com/zz/combo?a/i/us/nws/weather/gr/${today.code}d.png`);
  $l('#today-temp').html(today.temp);
  $l('#atmos-humidity').html(result.atmosphere.humidity);
  $l('#wind-speed').html(result.wind.speed);

  forecast.forEach( (f, i) => {
    if (i > 7 ) return;
    $l(`#forecast-day-${i}`).html(f.day);
    $l(`#forecast-high-${i}`).html(f.high);
    $l(`#forecast-low-${i}`).html(f.low);
    $l(`#img-${i}`).attr('src', `https://s.yimg.com/zz/combo?a/i/us/nws/weather/gr/${f.code}d.png`)
  });
}

$l( () => {
  console.log('the document is ready');
  const query = loadWeather();
});

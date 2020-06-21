/**
 * Minified by jsDelivr using Terser v3.14.1.
 * Original file: /gh/bramkragten/weather-card@1.4.3/dist/weather-card.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
const LitElement = Object.getPrototypeOf(customElements.get("hui-view")), html = LitElement.prototype.html, css = LitElement.prototype.css, weatherIconsDay = { clear: "day", "clear-night": "night", cloudy: "cloudy", fog: "cloudy", hail: "rainy-7", lightning: "thunder", "lightning-rainy": "thunder", partlycloudy: "cloudy-day-3", pouring: "rainy-6", rainy: "rainy-5", snowy: "snowy-6", "snowy-rainy": "rainy-7", sunny: "day", windy: "cloudy", "windy-variant": "cloudy-day-3", exceptional: "!!" }, weatherIconsNight = { ...weatherIconsDay, clear: "night", sunny: "night", partlycloudy: "cloudy-night-3", "windy-variant": "cloudy-night-3" }, windDirections = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW", "N"], fireEvent = (t, e, i, n) => { n = n || {}, i = null == i ? {} : i; const a = new Event(e, { bubbles: void 0 === n.bubbles || n.bubbles, cancelable: Boolean(n.cancelable), composed: void 0 === n.composed || n.composed }); return a.detail = i, t.dispatchEvent(a), a }; function hasConfigOrEntityChanged(t, e) { if (e.has("_config")) return !0; const i = e.get("hass"); return !i || (i.states[t._config.entity] !== t.hass.states[t._config.entity] || i.states["sun.sun"] !== t.hass.states["sun.sun"]) } class WeatherCard3 extends LitElement {
    static get properties() { return { _config: {}, hass: {} } } static async getConfigElement() { return await import("./weather-card-editor2.js"), document.createElement("weather-card-editor2") } static getStubConfig() { return {} } setConfig(t) { if (!t.entity) throw new Error("Please define a weather entity"); this._config = t } shouldUpdate(t) { return hasConfigOrEntityChanged(this, t) } render() {
        if (!this._config || !this.hass) return html``; this.numberElements = 0; const t = this.hass.states[this._config.entity]; return t ? html`
      <ha-card @click="${this._handleClick}">
        ${!1 !== this._config.current ? this.renderCurrent(t) : ""}
        ${!1 !== this._config.details ? this.renderDetails(t) : ""}
        ${!1 !== this._config.forecast ? this.renderForecast(t.attributes.forecast) : ""}
      </ha-card>
    `: html`
        <style>
          .not-found {
            flex: 1;
            background-color: yellow;
            padding: 8px;
          }
        </style>
        <ha-card>
          <div class="not-found">
            Entity not available: ${this._config.entity}
          </div>
        </ha-card>
      `} renderCurrent(t) {
        return this.numberElements++, html`
      <div class="current ${this.numberElements > 1 ? "spacer" : ""}">
        <span
          class="icon bigger"
          style="background: none, url('${this.getWeatherIcon(t.state.toLowerCase(), this.hass.states["sun.sun"].state)}') no-repeat; background-size: contain;"
          >${t.state}
        </span>
        ${this._config.name ? html`
              <span class="title"> ${this._config.name} </span>
            `: ""}
        <span class="temp"
          >${"°F" == this.getUnit("temperature") ? Math.round(t.attributes.temperature) : t.attributes.temperature}</span
        >
        <span class="tempc"> ${this.getUnit("temperature")}</span>
      </div>
    `} renderDetails(t) {
        const e = this.hass.states["sun.sun"]; let i, n; return e && (i = new Date(e.attributes.next_rising), n = new Date(e.attributes.next_setting)), this.numberElements++, html`
      <ul class="variations ${this.numberElements > 1 ? "spacer" : ""}">
        <li>
          <ha-icon icon="mdi:water-percent"></ha-icon>
          ${t.attributes.humidity}<span class="unit"> % </span>
        </li>
        <li>
          <ha-icon icon="mdi:weather-windy"></ha-icon> ${windDirections[parseInt((t.attributes.wind_bearing + 11.25) / 22.5)]}
          ${t.attributes.wind_speed}<span class="unit">
            ${this.getUnit("length")}/h
          </span>
        </li>
        <li>
          <ha-icon icon="mdi:gauge"></ha-icon>
          ${t.attributes.pressure}
          <span class="unit">
            ${this.getUnit("air_pressure")}
          </span>
        </li>
        <li>
          <ha-icon icon="mdi:weather-fog"></ha-icon> ${t.attributes.visibility}<span class="unit">
            ${this.getUnit("length")}
          </span>
        </li>
        ${i ? html`
              <li>
                <ha-icon icon="mdi:weather-sunset-up"></ha-icon>
                ${i.toLocaleTimeString()}
              </li>
            `: ""}
        ${n ? html`
              <li>
                <ha-icon icon="mdi:weather-sunset-down"></ha-icon>
                ${n.toLocaleTimeString()}
              </li>
            `: ""}
      </ul>
    `} renderForecast(t) {
        if (!t || 0 === t.length) return html``; const e = this.hass.selectedLanguage || this.hass.language; return this.numberElements++, html`
      <div class="forecast clear ${this.numberElements > 1 ? "spacer" : ""}">
        ${t.slice(0, 5).map(t => html`
            <div class="day">
              <div class="dayname">
                ${new Date(t.datetime).toLocaleDateString(e, { weekday: "short" })}
              </div>
              <i
                class="icon"
                style="background: none, url('${this.getWeatherIcon(t.condition.toLowerCase())}') no-repeat; background-size: contain"
              ></i>
              <div class="highTemp">
                ${t.temperature}${this.getUnit("temperature")}
              </div>
              ${void 0 !== t.templow ? html`
                    <div class="lowTemp">
                      ${t.templow}${this.getUnit("temperature")}
                    </div>
                  `: ""}
              ${this._config.hide_precipitation || void 0 === t.precipitation || null === t.precipitation ? "" : html`
                    <div class="precipitation">
                      ${t.precipitation} ${this.getUnit("precipitation")}
                    </div>
                  `}
            </div>
          `)}
      </div>
    `} getWeatherIcon(t, e) { return `${this._config.icons ? this._config.icons : "https://cdn.jsdelivr.net/gh/bramkragten/weather-card/dist/icons/"}${e && "below_horizon" == e ? weatherIconsNight[t] : weatherIconsDay[t]}.svg` } getUnit(t) { const e = this.hass.config.unit_system.length; switch (t) { case "air_pressure": return "km" === e ? "hPa" : "inHg"; case "length": return e; case "precipitation": return "km" === e ? "mm" : "in"; default: return this.hass.config.unit_system[t] || "" } } _handleClick() { fireEvent(this, "hass-more-info", { entityId: this._config.entity }) } getCardSize() { return 3 } static get styles() {
        return css`
      ha-card {
        cursor: pointer;
        margin: auto;
        padding-top: 1.3em;
        padding-bottom: 1.3em;
        padding-left: 1em;
        padding-right: 1em;
        position: relative;
      }

      .spacer {
        padding-top: 1em;
      }

      .clear {
        clear: both;
      }

      .title {
        position: absolute;
        left: 3em;
        top: 0.6em;
        font-weight: 300;
        font-size: 3em;
        color: var(--primary-text-color);
      }
      .temp {
        font-weight: 300;
        font-size: 4em;
        color: var(--primary-text-color);
        position: absolute;
        right: 1em;
        top: 0.3em;
      }

      .tempc {
        font-weight: 300;
        font-size: 1.5em;
        vertical-align: super;
        color: var(--primary-text-color);
        position: absolute;
        right: 1em;
        margin-top: -14px;
        margin-right: 7px;
      }

      .current {
        padding-top: 1.2em;
        margin-bottom: 3.5em;
      }

      .variations {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        font-weight: 300;
        color: var(--primary-text-color);
        list-style: none;
        padding: 0 1em;
        margin: 0;
      }

      .variations ha-icon {
        height: 22px;
        margin-right: 5px;
        color: var(--paper-item-icon-color);
      }

      .variations li {
        flex-basis: auto;
        width: 50%;
      }

      .variations li:nth-child(2n) {
        text-align: right;
      }

      .variations li:nth-child(2n) ha-icon {
        margin-right: 0;
        margin-left: 8px;
        float: right;
      }

      .unit {
        font-size: 0.8em;
      }

      .forecast {
        width: 100%;
        margin: 0 auto;
        display: flex;
      }

      .day {
        flex: 1;
        display: block;
        text-align: center;
        color: var(--primary-text-color);
        border-right: 0.1em solid #d9d9d9;
        line-height: 2;
        box-sizing: border-box;
      }

      .dayname {
        text-transform: uppercase;
      }

      .forecast .day:first-child {
        margin-left: 0;
      }

      .forecast .day:nth-last-child(1) {
        border-right: none;
        margin-right: 0;
      }

      .highTemp {
        font-weight: bold;
      }

      .lowTemp {
        color: var(--secondary-text-color);
      }

      .precipitation {
        color: var(--primary-text-color);
        font-weight: 300;
      }

      .icon.bigger {
        width: 10em;
        height: 10em;
        margin-top: -4em;
        position: absolute;
        left: 0em;
      }

      .icon {
        width: 50px;
        height: 50px;
        margin-right: 5px;
        display: inline-block;
        vertical-align: middle;
        background-size: contain;
        background-position: center center;
        background-repeat: no-repeat;
        text-indent: -9999px;
      }

      .weather {
        font-weight: 300;
        font-size: 1.5em;
        color: var(--primary-text-color);
        text-align: left;
        position: absolute;
        top: -0.5em;
        left: 6em;
        word-wrap: break-word;
        width: 30%;
      }
    `}
} customElements.define("weather-card3", WeatherCard3);
//# sourceMappingURL=/sm/d4cf8ae7218e4b2052fddde81dff3c4ca3ed555e0eca5a9cbb14e8d810a952f1.map
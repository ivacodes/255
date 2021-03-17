# 25-5 clock React with Hooks

image pomo
![Screenshot](/readme/pomo.png)

## Preview

The app is deployed on Netlify

[![Netlify Status](https://api.netlify.com/api/v1/badges/c4b8a9f6-e643-43ef-8f99-561fa7436502/deploy-status)](https://the-timer.netlify.app/)

## Installation & Running

Clone the repo and run install in the project folder

```cmd
npm install
```

```cmd
npm run start
```

## Usage

Select your prefered work time and break time.
Press play to start the countdown.
After the work time is up, the break time starts. When the break is up, the whole phase work + break starts again.
A bell sound plays when either of the times are up.

![HowTo](/readme/pomo.gif)

Pressing on the reset button, resets the values to default: 25 minutes work time, 5 minutes break time.

![Reset](/readme/reset.gif)

During a countdown phase, the countdown timer and the current task are shown on the page title.

![Page title](/readme/title.gif)

To stop the countdown, press stop. The value in the countdown timer resets to your specified work time.

## Development

Built with functional components with hooks.

The picker component is rendered twice with different props

```jsx
<Picker title='Break' defValue={5} getRes={setBreakTime} />
<Picker title='Work' defValue={25} getRes={setWorkTime} />
```

Selected values are passed down to the timer component

```jsx
<Timer workTime={workTime} breakTime={breakTime} />
```

## Assets

Bell sound by:
"Hand Bells, G, Single.wav" by InspectorJ (www.jshaw.co.uk) of Freesound.org

Tomato icon by:
<https://www.flaticon.com/authors/icongeek26>
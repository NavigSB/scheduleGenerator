// Stands for extensible class. Allows making tailwind classes with inheritance easier.
export function extClass(classes, extensionClasses) {
  return (classes + " " + (extensionClasses || "")).trim();
}

export function timeToDate(timeStr) {
  let timeDate = new Date();
  timeDate.setHours(parseInt(timeStr.split(":")[0]));
  timeDate.setMinutes(parseInt(timeStr.split(":")[1]));
  return timeDate;
}

export function randomInt(min, max) {
  if(max === undefined) {
    if(min === undefined) {
      min = 0;
      max = 1;
    }else{
      max = min;
      min = 0;
    }
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomColor() {
  let hex = Math.floor(Math.random() * 16777215).toString(16);
  while (hex.length < 6) {
    hex += "0";
  }
  return "#" + hex;
}

export function padInt(val, numPlaces) {
  val = val + "";
  while (val.length < numPlaces) {
    val = "0" + val;
  }
  return val;
}

export function getStandardDeviation(arr) {
  let avg = 0;
  for (let i = 0; i < arr.length; i++) {
    avg += arr[i];
  }
  avg /= arr.length;

  let squareSum = 0;
  for (let val in arr) {
    squareSum += (avg - val) * (avg - val);
  }

  return Math.sqrt(squareSum / arr.length);
}

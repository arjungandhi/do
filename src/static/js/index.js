document.addEventListener("DOMContentLoaded", (event) => {
  setup();
});

//create timer
var timer;

async function setup() {
   // get newest task from priority queue and set it
  next_task()

  //set timer to work
  set_timer(25);
  assign_start();

  //setting different timer modes
  document.getElementById("work").onclick = () => {
    set_timer_color('--nord11')
    set_timer(25);
  };
  document.getElementById("short").onclick = () => {
    set_timer_color('--nord2')
    set_timer(5);
  };
  document.getElementById("long").onclick = () => {
    set_timer_color('--nord10')
    set_timer(15);
  };

  document.getElementById("time_input").onchange = () => {
    time = document.getElementById("time_input").value
    if (time.includes(':')) {
      time_parts = time.split(':')
      time = parseInt(time_parts[0]) * 60 + parseInt(time_parts[1])
    }
    else {
      parseInt(time)
    }

    set_timer(time)
  };

}

// get newest task from priority queue and set it
async function next_task(){
  response = await fetch('/next-task');
  if (response.status == 200) {
    set_current_task(await response.text());
  }
}

// add task
async function add_task(){
  task_input = document.getElementById('task_input');
  set_current_task(task_input.value);
  console.log(task_input.value);
  response = await fetch('/add-task',{ task: task_input.value });
  if (response.status == 200) {
  task_input.value = '';
  }
  
}






function set_timer_color(color) {
  var style = getComputedStyle(document.body)
  document.getElementById("timer background").style.backgroundColor = style.getPropertyValue(color);
}

function assign_start() {
  button = document.getElementById("timer button");
  button.onclick = start_time;
  button.innerHTML = "Start";
}

function assign_stop() {
  button = document.getElementById("timer button");
  button.onclick = stop_time;
  button.innerHTML = "Stop";
}

function stop_time() {
  clearInterval(timer);
  assign_start();
}

function start_time() {
  //create timer
  timer = setInterval(count_down, 1000);
  assign_stop();
}

function count_down() {
  window.current_time = window.current_time - 1;
  update_time();
  if (window.current_time == 0) {
    stop_time();
    alert("you done");
  }
}

function set_timer(time) {
  stop_time();

  window.current_time = time * 60;
  update_time();
}

function update_time() {
  document.getElementById("timer text").innerHTML = formatTimeLeft(
    window.current_time
  );
}

function formatTimeLeft(time) {
  // The largest round integer less than or equal to the result of time divided being by 60.
  const minutes = Math.floor(time / 60);

  // Seconds are the remainder of the time divided by 60 (modulus operator)
  let seconds = time % 60;

  // If the value of seconds is less than 10, then display seconds with a leading zero
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  // The output in MM:SS format
  return `${minutes}:${seconds}`;
}

function set_current_task(s) {
  document.getElementById("current task").innerHTML = s;
}

# Brinton Entertainment
The Brinton Collection contains films, slides, projectors, papers, and other documents from the life and career of William Franklin Brinton of Washington, IA. Brinton was an itinerant showman, traveling from Texas to Minnesota to project slides, film, and stage other entertainments during the years 1895-1909. He was also the manager of the Graham Opera House in Washington, which is still an active movie theater today and was recently declared the longest continually operating cinema in the world. This project showcases some of his magic lantern slides as well as the locations he visited. To learn more information and see more of his films, visit the [Brinton Entertainment website](https://brinton.lib.uiowa.edu/).
## Getting Started
To get a copy of the project up and running on your local machine, follow the instructions below.
### Installing
This project uses Electron, so you will first need to install Node.js and download this repository, then run the following commands.
```
# Navigate to the project folder
cd iro-electron
# Install dependencies
npm install
# Run the application
npm start
```
## Project Basics
A simple inactivity timer is used to alternate between the main page window and the window that includes the map.
```
#create variables for the timers
var t, open, close;

#the idleTimer function contains all the actions required for the timer
function idleTimer() {
	#add all conditions on which the timer should reset (anything that counts as activity)
	window.onload=resetTimer;
	window.onclick=resetTimer;
	#can receive messages from other windows if they also have activity
	ipcRenderer.on('reset', function() {
		resetTimer();
	})
		
	#sets up the inactivity rotation and handles all actions needed during the rotation
	function rotation() {
		#close/hide anything that shouldn't be open when inactivity starts
		ipcRenderer.send('closeShowing');
		ipcRenderer.send('closeMeet');
		ipcRenderer.send('closeMap');
			
		#main rotation timer
		open = setInterval(function() {
			#opens the map page after 5 minutes
			ipcRenderer.send('openMap');
			close = setTimeout(function() {
				#closes the map 2.5 minutes after the map is opened
				ipcRenderer.send('closeMap');
			}, 150000);
		}, 300000);
	}
		
	#determines how long after any activity the rotation timer will start
	function resetTimer() {
		#clear all the other timers whenever there is any activity
		clearTimeout(close);
		clearInterval(open);
		clearTimeout(t);
		
		#if there is not any more activity after the t timer is initially cleared,
		#it will run the rotation function after 5 minutes
		t = setTimeout(rotation, 300000);
	}
}
			
#run the idleTimer
idleTimer();
```
## Built With
* [Electron](https://electronjs.org/docs)
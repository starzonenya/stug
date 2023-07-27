// define shortcut functions
const idget = (e) => document.getElementById(e);
const qrget = (e) => document.querySelector(e);
const cdrce = (e, v) => document.documentElement.style.setProperty(e, v);
const ggcrv = (e) => getComputedStyle(document.documentElement).getPropertyValue(e).trim();

// initialize some variables
let initialX, initialY, mainbordercolor, headerbordercolor, headercolor;

// function for handling inactive/active toggle button
const handleToggle = (element) => {
  const ev = element.value;
  const isActive = (ev === "INACTIVE") ? false : true;
  if (!isActive) {
    element.className = 'toggle active';
    element.value = "ACTIVE";
  } else {
    element.className = 'toggle inactive';
    element.value = "INACTIVE";
  }
};

// functions for handling the minimize/maximize button
const minimizeModMenu = () => {
  /// change dimensions
  cdrce('--modmenu-header-height', '5px');
  cdrce('--modmenu-height', '28px');
  cdrce('--modmenu-width', '33px');

  /// change colors
  mainbordercolor = ggcrv('--main-border-color');
  headerbordercolor = ggcrv('--header-border-color');
  headercolor = ggcrv('--header-color');
  cdrce('--main-border-color', 'var(--minimized-color)');
  cdrce('--header-border-color', 'var(--minimized-color)');
  cdrce('--header-color', 'var(--minimized-color)');

  /// change visibility and positions
  cdrce('--maximize-button-left', '165px');
  cdrce('--visibility', 'hidden');

  /// hide the minimize element & show the maximize element
  maximize.className = 'maximize';
  minimize.className = 'minimize hidden';
};

const maximizeModMenu = () => {
  /// hide the maximize element & show the minimize element
  maximize.className = 'maximize hidden';
  minimize.className = 'minimize';

  /// change visibility and positions
  cdrce('--visibility', 'visible');
  cdrce('--maximize-button-left', '0px');

  /// change colors
  cdrce('--main-border-color', mainbordercolor);
  cdrce('--header-border-color', headerbordercolor);
  cdrce('--header-color', headercolor);

  /// change dimensions
  cdrce('--modmenu-width', '340px');
  cdrce('--modmenu-height', '300px');
  cdrce('--modmenu-header-height', '8px');
};

// exploit functions
const anonymityMode = () => {

};

// variables for the modmenu elements
const modmenuheader = qrget('.modmenu-header');
const modmenu = qrget('.modmenu');
const minimize = idget('mini');
const maximize = idget('maxi');

// variables for modmenu feature elements
const anonymitymode = idget('am-m');

// event listeners for dragging
modmenuheader.addEventListener("dragstart", function(event) {
  /// store initial position when drag starts
  initialX = event.clientX - modmenuheader.offsetLeft;
  initialY = event.clientY - modmenuheader.offsetTop;
});

modmenuheader.addEventListener("drag", function(event) {
  /// update position as the drag is happening
  var newX = event.clientX - initialX;
  var newY = event.clientY - initialY;

  /// apply new position
  modmenuheader.style.left = newX + "px";
  modmenuheader.style.top = newY + "px";
});

// process interactions with minimize/maximize buttons
minimize.onclick = () => minimizeModMenu();
maximize.onclick = () => maximizeModMenu();

// process interactions for modmenu features
anonymitymode.onclick = function() {
  handleToggle(this);
  anonymityMode();
};

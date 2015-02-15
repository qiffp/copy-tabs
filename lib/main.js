var self = require("sdk/self");
var { ToggleButton } = require("sdk/ui/button/toggle");
var tabs = require("sdk/tabs");
var prefs = require("sdk/simple-prefs").prefs;
var clipboard = require("sdk/clipboard");
var panels = require("sdk/panel");

var button = ToggleButton({
  id: "copy-tabs",
  label: "Copy Tabs",
  icon: {
    "16": self.data.url("icon-16.png"),
    "32": self.data.url("icon-32.png"),
    "64": self.data.url("icon-64.png"),
  },
  onChange: togglePanel
});

function togglePanel(state) {
  if (state.checked) {
    panel.show({
      position: button
    });
  }
}

var panel = panels.Panel({
  contentURL: self.data.url("panel.html"),
  contentScriptFile: [
    self.data.url("vendor/jquery-2.1.1.min.js"),
    self.data.url("panel.js")
  ],
  onShow: handleShow,
  onHide: handleHide
});

panel.port.on("ready", function() {
  panel.port.emit("defaults", {
    separator: prefs.separator,
    includePinned: prefs.includePinned
  });
});

panel.port.on("update-settings", function(settings) {
  prefs[settings.setting] = settings.value;
});

panel.port.on("copy-tabs", function() {
  var list = "";
  for (let tab of tabs) {
    if (prefs.includePinned || (!prefs.includePinned && !tab.isPinned)) {
      list += tab.url + prefs.separator;
    }
  }
  clipboard.set(list);
  panel.hide();
});

panel.port.on("resize", function(size) {
  panel.resize(size.width, size.height);
});

function handleShow() {
  panel.port.emit("get-size");
}

function handleHide() {
  button.state("window", {
    checked: false
  });
}


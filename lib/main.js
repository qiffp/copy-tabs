var self = require("sdk/self");
var { ActionButton } = require("sdk/ui/button/action");
var tabs = require("sdk/tabs");
var prefs = require("sdk/simple-prefs").prefs;
var clipboard = require("sdk/clipboard");

var button = ActionButton({
  id: "copy-tabs",
  label: "Copy Tabs",
  icon: {
    "16": self.data.url("icon-16.png"),
    "32": self.data.url("icon-32.png"),
    "64": self.data.url("icon-64.png"),
  },
  onClick: copyTabs
});

function copyTabs() {
  var list = "";
  for (let tab of tabs) {
    if (prefs.includePinned || (!prefs.includePinned && !tab.isPinned)) {
      list += tab.url + prefs.separator;
    }
  }
  clipboard.set(list);
}


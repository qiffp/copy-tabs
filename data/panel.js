$(function() {
  self.port.emit("ready");
  self.port.on("defaults", function(defaults) {
    $("#separator-input").val(defaults.separator.replace(/[\n]/g, "\\n"));
    $("#include-pinned-checkbox").prop("checked", defaults.includePinned);
  });

  $("#separator-input").change(function() {
    self.port.emit("update-settings", {
      setting: "separator",
      value: $(this).val()
    });
  });

  $("#include-pinned-checkbox").change(function() {
    self.port.emit("update-settings", {
      setting: "includePinned",
      value: $(this).prop("checked")
    });
  });

  $("#copy-tabs-button").click(function() {
    self.port.emit("copy-tabs");
  });

});


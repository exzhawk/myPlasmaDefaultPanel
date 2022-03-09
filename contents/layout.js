var panel = new Panel
var panelScreen = panel.screen
var freeEdges = {"bottom": true, "top": true, "left": true, "right": true}

for (i = 0; i < panelIds.length; ++i) {
    var tmpPanel = panelById(panelIds[i])
    if (tmpPanel.screen == panelScreen) {
        // Ignore the new panel
        if (tmpPanel.id != panel.id) {
            freeEdges[tmpPanel.location] = false;
        }
    }
}

if (freeEdges["bottom"] == true) {
    panel.location = "bottom";
} else {
    // There is no free edge, so leave the default value
    panel.location = "top";
}
// For an Icons-Only Task Manager on the bottom, *3 is too much, *2 is too little
// Round down to next highest even number since the Panel size widget only displays
// even numbers
panel.height = 2 * Math.floor(gridUnit * 2.5 / 2)

// Restrict horizontal panel to a maximum size of a 21:9 monitor
const maximumAspectRatio = 21/9;
if (panel.formFactor === "horizontal") {
    const geo = screenGeometry(panelScreen);
    const maximumWidth = Math.ceil(geo.height * maximumAspectRatio);

    if (geo.width > maximumWidth) {
        panel.alignment = "center";
        panel.minimumLength = maximumWidth;
        panel.maximumLength = maximumWidth;
    }
}

var kickoff = panel.addWidget("org.kde.plasma.kickoff")
kickoff.currentConfigGroup = ["Shortcuts"]
kickoff.writeConfig("global", "Alt+F1")

//panel.addWidget("org.kde.plasma.showActivityManager")
panel.addWidget("org.kde.plasma.pager")
taskmanager = panel.addWidget("org.kde.plasma.taskmanager")
taskmanager.currentConfigGroup=["General"]
taskmanager.writeConfig("groupingStrategy", "0")

taskmanager.writeConfig("maxStripes", "1")
taskmanager.writeConfig("showOnlyCurrentScreen", "true")
taskmanager.writeConfig("launchers", '')
// panel.addWidget("org.kde.plasma.marginsseparator")

/* Next up is determining whether to add the Input Method Panel
 * widget to the panel or not. This is done based on whether
 * the system locale's language id is a member of the following
 * white list of languages which are known to pull in one of
 * our supported IME backends when chosen during installation
 * of common distributions. */

var langIds = ["as",    // Assamese
               "bn",    // Bengali
               "bo",    // Tibetan
               "brx",   // Bodo
               "doi",   // Dogri
               "gu",    // Gujarati
               "hi",    // Hindi
               "ja",    // Japanese
               "kn",    // Kannada
               "ko",    // Korean
               "kok",   // Konkani
               "ks",    // Kashmiri
               "lep",   // Lepcha
               "mai",   // Maithili
               "ml",    // Malayalam
               "mni",   // Manipuri
               "mr",    // Marathi
               "ne",    // Nepali
               "or",    // Odia
               "pa",    // Punjabi
               "sa",    // Sanskrit
               "sat",   // Santali
               "sd",    // Sindhi
               "si",    // Sinhala
               "ta",    // Tamil
               "te",    // Telugu
               "th",    // Thai
               "ur",    // Urdu
               "vi",    // Vietnamese
               "zh_CN", // Simplified Chinese
               "zh_TW"] // Traditional Chinese

// if (langIds.indexOf(languageId) != -1) {
//     panel.addWidget("org.kde.plasma.kimpanel");
// }

systemtray = panel.addWidget("org.kde.plasma.systemtray")
systemtrayContainmentId = systemtray.readConfig("SystrayContainmentId")
systemtrayContainment = desktopById(systemtrayContainmentId)
systemtrayContainment.currentConfigGroup = ["General"]
systemtrayContainment.writeConfig("showAllItems", "true")
systemtrayContainment.writeConfig("extraItems","org.kde.plasma.notifications,org.kde.plasma.printmanager,org.kde.plasma.battery,org.kde.plasma.mediacontroller,org.kde.plasma.clipboard,org.kde.plasma.devicenotifier,org.kde.plasma.manage-inputmethod,org.kde.plasma.keyboardlayout,org.kde.plasma.bluetooth,org.kde.plasma.volume,org.kde.plasma.keyboardindicator,org.kde.plasma.networkmanagement")
systemtrayContainment.writeConfig("knownItems","org.kde.plasma.notifications,org.kde.plasma.networkmanagement,org.kde.plasma.printmanager,org.kde.plasma.vault,org.kde.plasma.battery,org.kde.plasma.nightcolorcontrol,org.kde.plasma.mediacontroller,org.kde.plasma.clipboard,org.kde.plasma.devicenotifier,org.kde.plasma.manage-inputmethod,org.kde.plasma.keyboardlayout,org.kde.plasma.bluetooth,org.kde.plasma.volume,org.kde.plasma.keyboardindicator")
digitalclock = panel.addWidget("org.kde.plasma.digitalclock")
digitalclock.currentConfigGroup=['Appearance']
digitalclock.writeConfig("customDateFormat", "ddd MMM,d")
digitalclock.writeConfig("dateFormat", "custom")
digitalclock.writeConfig("use24hFormat","2")
panel.addWidget("org.kde.plasma.showdesktop")


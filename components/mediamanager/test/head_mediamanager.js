/*
//
// BEGIN SONGBIRD GPL
//
// This file is part of the Songbird web player.
//
// Copyright(c) 2005-2009 POTI, Inc.
// http://songbirdnest.com
//
// This file may be licensed under the terms of of the
// GNU General Public License Version 2 (the "GPL").
//
// Software distributed under the License is distributed
// on an "AS IS" basis, WITHOUT WARRANTY OF ANY KIND, either
// express or implied. See the GPL for the specific language
// governing rights and limitations.
//
// You should have received a copy of the GPL along with this
// program. If not, go to http://www.gnu.org/licenses/gpl.html
// or write to the Free Software Foundation, Inc.,
// 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
//
// END SONGBIRD GPL
//
*/

/**
 * Since we can't use the FUEL components until after all other components have
 * been loaded we define a lazy getter here for when we need it.
 */
__defineGetter__("Application", function() {
  delete this.Application;
  return this.Application = Cc["@mozilla.org/fuel/application;1"]
                              .getService(Ci.fuelIApplication);
});


Components.utils.import('resource://gre/modules/XPCOMUtils.jsm');
 
/**
 * \brief Some globally useful stuff for the tests
 */
var SB_NS = "http://songbirdnest.com/data/1.0#";
var SB_MEDIAFILEMANAGER = "@songbirdnest.com/Songbird/media-manager/file;1";
var SB_MEDIAMANAGERJOB = "@songbirdnest.com/Songbird/media-manager/job;1";

// Media manager preferences
var SB_MM_PREF_FOLDER = "songbird.media_management.library.folder";
var SB_MM_PREF_ENABLED = "songbird.media_management.library.enabled";
var SB_MM_PREF_COPY = "songbird.media_management.library.copy";
var SB_MM_PREF_MOVE = "songbird.media_management.library.move";
var SB_MM_PREF_RENAME = "songbird.media_management.library.rename";
var SB_MM_PREF_FMTDIR = "songbird.media_management.library.format.dir";
var SB_MM_PREF_FMTFILE = "songbird.media_management.library.format.file";

// An array of what our test results should be
var gResultInformation = [
  { originalFileName: "TestFile1.mp3",
    expectedFileName: "1 - Sample.mp3",
    expectedFolder:   "Managed/Songbird/Unit Test Classics" },
  { originalFileName: "TestFile2.mp3",
    expectedFileName: "2 - Sample.mp3",
    expectedFolder:   "Managed/Songbird/Unit Test Classics" },
  { originalFileName: "TestFile3.mp3",
    expectedFileName: "3 - Sample.mp3",
    expectedFolder:   "Managed/Songbird/Unit Test Classics" },

  { originalFileName: "TestFile4.mp3",
    expectedFileName: "1 - TestFile4.mp3.mp3",
    expectedFolder:   "Managed/Unknown Artist/Unknown Album" },

  { originalFileName: "TestFile5.mp3",
    expectedFileName: "1 - Sample.mp3",
    expectedFolder:   "Managed/Songbird/Unknown Album" },

  { originalFileName: "TestFile6.mp3",
    expectedFileName: "1 - Sample.mp3",
    expectedFolder:   "Managed/Unknown Artist/Unit Test Classics" }
];

// Keep a copy of the original prefs so we don't screw anything up
var gOriginalPrefs = null;
// Test library to use.
var gTestLibrary;
// Items we add to the library to test our file management
var gTestMediaItems;
// We use this in many places for creating our file paths
var gFileLocation = "testharness/mediamanager/files/";


/**
 * Save the Media Manager preferences.
 */
function saveMediaManagerPreferences () {
  // Setup some defaults
  gOriginalPrefs = {
    folder: null,
    copy: false,
    move: false,
    rename: false,
    formatDir: "",
    formatFile: "",
    enabled: false
  };

  var prefBranch = Cc["@mozilla.org/preferences-service;1"]
                     .getService(Ci.nsIPrefBranch2);

  // Store the current preferences so we can restore them later
  if (Application.prefs.has(SB_MM_PREF_FOLDER)) {
    try {
      gOriginalPrefs.folder = prefBranch.getComplexValue(SB_MM_PREF_FOLDER,
                                                         Ci.nsILocalFile);
    } catch (err) {
      log("Unable to save folder preference: " + err);
    }
  }
  
  gOriginalPrefs.enabled = Application.prefs.getValue(SB_MM_PREF_ENABLED, false);
  gOriginalPrefs.copy = Application.prefs.getValue(SB_MM_PREF_COPY, false);
  gOriginalPrefs.move = Application.prefs.getValue(SB_MM_PREF_MOVE, false);
  gOriginalPrefs.rename = Application.prefs.getValue(SB_MM_PREF_RENAME, false);
  gOriginalPrefs.formatDir = Application.prefs.getValue(SB_MM_PREF_FMTDIR, "");
  gOriginalPrefs.formatFile = Application.prefs.getValue(SB_MM_PREF_FMTFILE, "");
}

/**
 * Restore the Media Manager preferences.
 * Called in tail_metadatamanager.js
 */
function restoreMediaManagerPreferences() {
  // Don't do anything if we didn't save the prefs
  if (gOriginalPrefs == null) {
    log("Not restoring prefs!!!");
    return;
  }

  var prefBranch = Cc["@mozilla.org/preferences-service;1"]
                     .getService(Ci.nsIPrefBranch2);

  if (gOriginalPrefs.folder) {
    prefBranch.setComplexValue(SB_MM_PREF_FOLDER,
                               Ci.nsILocalFile,
                               gOriginalPrefs.folder);
  }
  prefBranch.setBoolPref(SB_MM_PREF_ENABLED, gOriginalPrefs.enabled);
  prefBranch.setBoolPref(SB_MM_PREF_COPY, gOriginalPrefs.copy);
  prefBranch.setBoolPref(SB_MM_PREF_MOVE, gOriginalPrefs.move);
  prefBranch.setBoolPref(SB_MM_PREF_RENAME, gOriginalPrefs.rename);
  prefBranch.setCharPref(SB_MM_PREF_FMTDIR, gOriginalPrefs.formatDir);
  prefBranch.setCharPref(SB_MM_PREF_FMTFILE, gOriginalPrefs.formatFile);
}

/**
 * Set up what we want the preferences to be, we need to do this since the
 * Media Manager depends on the preferences to organize.
 */
function setupMediaManagerPreferences () {
  // First thing is to save them if they have not already been saved
  if (gOriginalPrefs == null) {
    saveMediaManagerPreferences();
  }
  
  var prefBranch = Cc["@mozilla.org/preferences-service;1"]
                     .getService(Ci.nsIPrefBranch2);

  var separator = "/";
  if (getPlatform() == "Windows_NT") {
    separator = "\\";
  }
  var managedFolder = testFolder.clone();
  managedFolder.append("Managed");
  // Create the folder
  managedFolder.create(Ci.nsIFile.DIRECTORY_TYPE, 0777);
  
  prefBranch.setComplexValue(SB_MM_PREF_FOLDER, Ci.nsILocalFile, managedFolder);
  prefBranch.setBoolPref(SB_MM_PREF_ENABLED, false);
  prefBranch.setBoolPref(SB_MM_PREF_COPY, true);
  prefBranch.setBoolPref(SB_MM_PREF_MOVE, true);
  prefBranch.setBoolPref(SB_MM_PREF_RENAME, true);
  prefBranch.setCharPref(SB_MM_PREF_FMTDIR,
                         SB_NS + "artistName," +
                         separator + "," +
                         SB_NS + "albumName");
  prefBranch.setCharPref(SB_MM_PREF_FMTFILE,
                         SB_NS + "trackNumber," +
                         " - ," +
                         SB_NS + "trackName");
}

/**
 * Adds some test files to the test library, we need to use items in a library
 * since the MediaFileManager uses the property information to organize.
 */
function addItemsToLibrary(aLibrary) {
  var toAdd = Cc["@songbirdnest.com/moz/xpcom/threadsafe-array;1"]
                .createInstance(Ci.nsIMutableArray);
  var propertyArray = Cc["@songbirdnest.com/moz/xpcom/threadsafe-array;1"]
                        .createInstance(Ci.nsIMutableArray);
  var ioService = Cc["@mozilla.org/network/io-service;1"]
                    .getService(Ci.nsIIOService);
  for (var i = 0; i < gResultInformation.length; i++) {
    // Set up the item
    var newFile = testFolder.clone();
    newFile.append(gResultInformation[i].originalFileName);
    toAdd.appendElement(ioService.newFileURI(newFile), false);
    
    // Setup default properties for this item
    var props = Cc["@songbirdnest.com/Songbird/Properties/MutablePropertyArray;1"]
                  .createInstance(Ci.sbIMutablePropertyArray);
    props.appendProperty(SB_NS + "contentLength", i + 1);
    props.appendProperty(SB_NS + "trackNumber", i + 1);
    propertyArray.appendElement(props, false);
  }

  aLibrary.batchCreateMediaItems(toAdd, propertyArray);
}

/**
 * Check the items path with the expected results, return true if ok.
 */
function checkItem(aMediaItem, aResultInformationIndex) {
  // First get the current path from the item
  var current = aMediaItem.contentSrc.QueryInterface(Ci.nsIFileURL);
  if (!(current instanceof Ci.nsIFileURL)) {
    return false;
  }
  current = current.file;
  var currentPath = decodeURIComponent(current.path);
  
  // Now put together the expected path for the item
  var expected = testFolder.clone();
  expected = appendPathToDirectory(expected,
                                   gResultInformation[aResultInformationIndex].expectedFolder);
  expected.append(gResultInformation[aResultInformationIndex].expectedFileName);
  var expectedPath = expected.path;
  
  // Compare the current to expected
  return (current.equals(expected));
}

/**
 * Check that a file for an item has been deleted.
 */
function checkDeletedItem(aMediaItem) {
  var fileURI = aMediaItem.contentSrc.QueryInterface(Ci.nsIFileURL);
  if (fileURI instanceof Ci.nsIFileURL) {
    var file = fileURI.file;
    return !file.exists();
  }
  return false;
} 

/**
 * A test Media List Listener to watch for additions to the library
 */
function TestMediaListListener() {
  this._added = Components.classes["@songbirdnest.com/moz/xpcom/threadsafe-array;1"]
                          .createInstance(Components.interfaces.nsIMutableArray);
}
TestMediaListListener.prototype = {
  _added: null,
  _retval: false,

  get added() {
    return this._added;
  },

  onItemAdded: function onItemAdded(list, item, index) {
    this._added.appendElement( item, false );
    //this._added.push({list: list, item: item, index: index});
    return this._retval;
  },

  onBeforeItemRemoved: function onBeforeItemRemoved(list, item, index) {
    return this._retval;
  },

  onAfterItemRemoved: function onAfterItemRemoved(list, item, index) {
    return this._retval;
  },

  onItemUpdated: function onItemUpdated(list, item, properties) {
    return this._retval;
  },

  onItemMoved: function onItemMoved(list, fromIndex, toIndex) {
    return this._retval;
  },

  onBatchBegin: function onBatchBegin(list) {
  },

  onBatchEnd: function onBatchEnd(list) {
  },
  onListCleared: function onListCleared() {
    return this._retval;
  },
  QueryInterface: XPCOMUtils.generateQI([Ci.sbIMediaListListener])
}


/**
 * Copy the given folder to tempName, returning an nsIFile for the new location
 */
function getCopyOfFolder(folder, tempName) {
  assertNotEqual(folder, null);
  var tempFolder = getTempFolder();
  folder.copyTo(tempFolder, tempName);
  folder = tempFolder.clone();
  folder.append(tempName);
  assertEqual(folder.exists(), true);
  return folder;
}

/**
 * Appends each directory found in path to the nsIFile object directory.
 */
function appendPathToDirectory(directory, path) {
  var nodes = path.split("/");
  for ( var i = 0, end = nodes.length; i < end; i++ )
  {
    directory.append( nodes[ i ] );
  }
  return directory;
}

/**
 * Gets a file/folder in our test folder
 */
function newAppRelativeFile( path ) {
  var file = Cc["@mozilla.org/file/directory_service;1"]
               .getService(Ci.nsIProperties)
               .get("resource:app", Ci.nsIFile);
  file = file.clone();
  return appendPathToDirectory(file, path);
}

/**
 * Get a temporary folder for use in metadata tests.
 * Will be removed in tail_metadatamanager.js
 */
var gTempFolder = null;
function getTempFolder() {
  if (gTempFolder) {
    return gTempFolder;
  }
  gTempFolder = Components.classes["@mozilla.org/file/directory_service;1"]
                       .getService(Components.interfaces.nsIProperties)
                       .get("TmpD", Components.interfaces.nsIFile);
  gTempFolder.append("songbird_mediamanager_tests.tmp");
  gTempFolder.createUnique(Components.interfaces.nsIFile.DIRECTORY_TYPE, 0777);
  return gTempFolder;
}

/**
 * Get rid of the temp folder created by getTempFolder.
 * Called in tail_metadatamanager.js
 */
function removeTempFolder() {
  if (gTempFolder && gTempFolder.exists()) {
    gTempFolder.remove(true);
  } else {
    log("\n\n\nMedia Manager Test may not have performed cleanup.  Temp files may exist.\n\n\n");
  }
}

/**
 * Get rid of any test librarys we have created
 */
function removeTestLibraries() {
  var libraryManager = Cc["@songbirdnest.com/Songbird/library/Manager;1"].
                       getService(Ci.sbILibraryManager);
  try {
    libraryManager.unregisterLibrary(gTestLibrary);
  } catch (err) {}
}

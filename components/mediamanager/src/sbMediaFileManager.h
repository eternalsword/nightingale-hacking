/*
//
// BEGIN SONGBIRD GPL
//
// This file is part of the Songbird web player.
//
// Copyright(c) 2005-2008 POTI, Inc.
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

// Songbird includes
#include <sbIMediaFileManager.h>
#include <sbIPropertyManager.h>
#include <sbIWatchFolderService.h>

// Mozilla includes
#include <nsIFile.h>
#include <nsIPrefBranch.h>
#include <nsStringGlue.h>
#include <nsTArray.h>
#include <nsCOMPtr.h>
#include <nsNetUtil.h>

#define SB_MEDIAFILEMANAGER_DESCRIPTION              \
  "Songbird Media File Manager Implementation"

#define SB_MEDIAFILEMANAGER_CID                      \
  {                                                        \
   0x7b901232,                                             \
   0x1dd2,                                                 \
   0x11b2,                                                 \
   {0x8d, 0x6a, 0xe1, 0x78, 0x4d, 0xbd, 0x2d, 0x89}        \
  }

// Preference keys
#define PREF_MFM_ROOT         "songbird.media_management.library."
#define PREF_MFM_LOCATION     "songbird.media_management.library.folder"
#define PREF_MFM_DIRFORMAT    "format.dir"
#define PREF_MFM_FILEFORMAT   "format.file"
#define PREF_MFM_DEFPROPERTY  "default.property."

// String keys
#define STRING_MFM_UNKNOWNPROP  "mediamanager.nonexistingproperty"

class sbMediaFileManager : public sbIMediaFileManager {
public:
  sbMediaFileManager();
  NS_METHOD Init();
  
  NS_DECL_ISUPPORTS
  NS_DECL_SBIMEDIAFILEMANAGER

protected:
  virtual ~sbMediaFileManager();
  
  nsresult GetNewPath(sbIMediaItem *aMediaItem,
                      nsString &aPath, 
                      PRBool *aRetVal);

  nsresult GetNewFilename(sbIMediaItem *aMediaItem, 
                          nsIURI *aItemUri,
                          nsString &aFilename, 
                          PRBool *aRetVal);

  nsresult CopyRename(sbIMediaItem *aMediaItem, 
                      nsIFile *aItemFile,
                      nsIFile *aNewFile,
                      PRBool *aRetVal);
  
  nsresult Delete(nsIFile *aItemFile, 
                  PRBool *aRetVal);
  
  nsresult CheckDirectoryForDeletion(nsIFile *aItemFile);
  
  nsresult NormalizeDir(nsString &aDir);
  
private:
  
  nsresult CheckDirectoryForDeletion_Recursive(nsIFile *aDir);
  
  nsresult GetFormatedFileFolder(nsTArray<nsString> aFormatSpec,
                                 sbIMediaItem* aMediaItem,
                                 PRBool aAppendProperty,
                                 nsString aFileExtension,
                                 nsString &aRetVal);

  // Hold on to the services we use very often
  nsCOMPtr<nsIPrefBranch>                   mPrefBranch;
  nsCOMPtr<nsINetUtil>                      mNetUtil;
  nsCOMPtr<sbIPropertyManager>              mPropertyManager;
  nsCOMPtr<sbIWatchFolderService>           mWatchFolderService;

  // Where our media folder is located.
  nsCOMPtr<nsIFile>                         mMediaFolder;

  // Formating properties (filename, folders, separators)
  nsTArray<nsString>                        mTrackNameConfig;
  nsTArray<nsString>                        mFolderNameConfig;
};


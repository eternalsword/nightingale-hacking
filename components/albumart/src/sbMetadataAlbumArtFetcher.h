/* -*- Mode: C++; tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2 -*- */
/* vim: set sw=2 :miv */
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

#ifndef __SB_METADATAALBUMARTFETCHER_H__
#define __SB_METADATAALBUMARTFETCHER_H__

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//
// Songbird metadata album art fetcher.
//
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------

/**
 * \file  sbMetadataAlbumArtFetcher.h
 * \brief Songbird Metadata Album Art Fetcher Definitions.
 */

//------------------------------------------------------------------------------
//
// Songbird metadata album art fetcher imported services.
//
//------------------------------------------------------------------------------

// Songbird imports.
#include <sbIAlbumArtFetcher.h>
#include <sbIAlbumArtService.h>
#include <sbIMetadataManager.h>

// Mozilla imports.
#include <nsCOMPtr.h>


//------------------------------------------------------------------------------
//
// Songbird metadata album art fetcher defs.
//
//------------------------------------------------------------------------------

//
// Songbird metadata album art fetcher component defs.
//

#define SB_METADATAALBUMARTFETCHER_CLASSNAME "sbMetadataAlbumArtFetcher"
#define SB_METADATAALBUMARTFETCHER_CID                                         \
  /* {61f7f510-abef-4b04-9ebf-078976f1bef1} */                                 \
  {                                                                            \
    0x61f7f510,                                                                \
    0xabef,                                                                    \
    0x4b04,                                                                    \
    { 0x9e, 0xbf, 0x07, 0x89, 0x76, 0xf1, 0xbe, 0xf1 }                         \
  }


//------------------------------------------------------------------------------
//
// Songbird metadata album art fetcher classes.
//
//------------------------------------------------------------------------------

/**
 * This class implements the metadata album art fetcher component.
 */

class sbMetadataAlbumArtFetcher : public sbIAlbumArtFetcher
{
  //----------------------------------------------------------------------------
  //
  // Public interface.
  //
  //----------------------------------------------------------------------------

public:

  //
  // Inherited interfaces.
  //

  NS_DECL_ISUPPORTS
  NS_DECL_SBIALBUMARTFETCHER


  //
  // Public services.
  //

  sbMetadataAlbumArtFetcher();

  virtual ~sbMetadataAlbumArtFetcher();

  nsresult Initialize();


  //----------------------------------------------------------------------------
  //
  // Private interface.
  //
  //----------------------------------------------------------------------------

private:

  //
  // mAlbumArtService           Album art service.
  // mMetadataManager           Metadata manager.
  // mAlbumArtSourceList        List of album art sources.
  // mIsComplete                True if fetching is complete.
  // mFoundAlbumArt             True if album art found.
  //

  nsCOMPtr<sbIAlbumArtService>  mAlbumArtService;
  nsCOMPtr<sbIMetadataManager>  mMetadataManager;
  nsCOMPtr<nsIArray>            mAlbumArtSourceList;
  PRBool                        mIsComplete;
  PRBool                        mFoundAlbumArt;


  //
  // Internal services.
  //

  nsresult GetMetadataHandler(nsIURI*              aContentSrcURI,
                              sbIMetadataHandler** aMetadataHandler);
};


#endif // __SB_METADATAALBUMARTFETCHER_H__


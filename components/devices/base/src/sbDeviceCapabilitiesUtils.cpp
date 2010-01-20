/*
 *=BEGIN SONGBIRD GPL
 *
 * This file is part of the Songbird web player.
 *
 * Copyright(c) 2005-2009 POTI, Inc.
 * http://www.songbirdnest.com
 *
 * This file may be licensed under the terms of of the
 * GNU General Public License Version 2 (the ``GPL'').
 *
 * Software distributed under the License is distributed
 * on an ``AS IS'' basis, WITHOUT WARRANTY OF ANY KIND, either
 * express or implied. See the GPL for the specific language
 * governing rights and limitations.
 *
 * You should have received a copy of the GPL along with this
 * program. If not, go to http://www.gnu.org/licenses/gpl.html
 * or write to the Free Software Foundation, Inc.,
 * 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
 *
 *=END SONGBIRD GPL
 */

#include "sbDeviceUtils.h"

#include <sbIDeviceCapabilities.h>

#include <sbDeviceCapabilitiesUtils.h>

NS_IMPL_ISUPPORTS1(sbDeviceCapabilitiesUtils,
                   sbIDeviceCapabilitiesUtils)
sbDeviceCapabilitiesUtils::sbDeviceCapabilitiesUtils()
{
}

sbDeviceCapabilitiesUtils::~sbDeviceCapabilitiesUtils()
{
}

NS_IMETHODIMP
sbDeviceCapabilitiesUtils::MapContentTypeToFileExtension(
                                             const nsAString &aMimeType,
                                             PRUint32 aContentType,
                                             nsAString &_retval)
{
  for (PRUint32 index = 0;
       index < MAP_FILE_EXTENSION_CONTENT_FORMAT_LENGTH;
       ++index)
  {
    sbExtensionToContentFormatEntry_t const &entry =
      MAP_FILE_EXTENSION_CONTENT_FORMAT[index];

    if (aMimeType.EqualsLiteral(entry.MimeType) &&
        aContentType == entry.ContentType)
    {
      _retval.AssignLiteral(entry.Extension);
    }
  }

  return NS_OK;
}

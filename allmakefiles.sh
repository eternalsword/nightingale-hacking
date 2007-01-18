#! /bin/sh
#
# ***** BEGIN LICENSE BLOCK *****
# Version: MPL 1.1/GPL 2.0/LGPL 2.1
#
# The contents of this file are subject to the Mozilla Public License Version
# 1.1 (the "License"); you may not use this file except in compliance with
# the License. You may obtain a copy of the License at
# http://www.mozilla.org/MPL/
#
# Software distributed under the License is distributed on an "AS IS" basis,
# WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
# for the specific language governing rights and limitations under the
# License.
#
# The Original Code is mozilla.org code.
#
# The Initial Developer of the Original Code is
# Netscape Communications Corporation.
# Portions created by the Initial Developer are Copyright (C) 1999
# the Initial Developer. All Rights Reserved.
#
# Contributor(s):
#
# Alternatively, the contents of this file may be used under the terms of
# either the GNU General Public License Version 2 or later (the "GPL"), or
# the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
# in which case the provisions of the GPL or the LGPL are applicable instead
# of those above. If you wish to allow use of your version of this file only
# under the terms of either the GPL or the LGPL, and not to allow others to
# use your version of this file under the terms of the MPL, indicate your
# decision by deleting the provisions above and replace them with the notice
# and other provisions required by the GPL or the LGPL. If you do not delete
# the provisions above, a recipient may use your version of this file under
# the terms of any one of the MPL, the GPL or the LGPL.
#
# ***** END LICENSE BLOCK *****

# allmakefiles.sh - List of all makefiles. 
#   Appends the list of makefiles to the variable, MAKEFILES.
#   There is no need to rerun autoconf after adding makefiles.
#   You only need to run configure.
#
#   Please keep the modules in this file in sync with those in
#   mozilla/build/unix/modules.mk
#

MAKEFILES=""

# add_makefiles - Shell function to add makefiles to MAKEFILES
add_makefiles() {
    MAKEFILES="$MAKEFILES $*"
}

if [ "$srcdir" = "" ]; then
    srcdir=.
fi

#
# App makefiles
#

MAKEFILES_app="
Makefile
app/Makefile
app/branding/Makefile
app/content/Makefile
app/content/bindings/Makefile
app/content/browser/Makefile
app/content/browser/content/Makefile
app/content/browser/locale/Makefile
app/content/browser/skin/Makefile
app/content/html/Makefile
app/content/scripts/Makefile
app/content/xul/Makefile
app/preferences/Makefile
"

MAKEFILES_build="
build/autodefs.mk
build/Makefile
"

MAKEFILES_components="
components/Makefile
"

MAKEFILES_dependencies="
dependencies/Makefile
dependencies/vendor/mp4/Makefile
"

MAKEFILES_feathers="
feathers/Makefile
feathers/dove/Makefile
feathers/rubberducky/Makefile
"

MAKEFILES_installer="
installer/Makefile
installer/linux/Makefile
installer/macosx/Makefile
installer/win32/Makefile
"

MAKEFILES_locales="
locales/Makefile
locales/branding/Makefile
locales/en-US/Makefile
"

#
# Component makefiles
#
MAKEFILES_bundle="
components/bundle/Makefile
components/bundle/public/Makefile
components/bundle/src/Makefile
"

MAKEFILES_controller="
components/controller/Makefile
components/controller/public/Makefile
components/controller/src/Makefile
"

MAKEFILES_commandline="
components/commandline/Makefile
components/commandline/src/Makefile
"

MAKEFILES_dataremote="
components/dataremote/Makefile
components/dataremote/public/Makefile
components/dataremote/src/Makefile
components/dataremote/tests/Makefile
"

MAKEFILES_dbengine="
components/dbengine/Makefile
components/dbengine/public/Makefile
components/dbengine/src/Makefile
components/dbengine/tests/Makefile
"

MAKEFILES_devicesobsolete="
components/devicesobsolete/Makefile
components/devicesobsolete/base/Makefile
components/devicesobsolete/base/public/Makefile
components/devicesobsolete/base/src/Makefile
components/devicesobsolete/manager/Makefile
components/devicesobsolete/manager/public/Makefile
components/devicesobsolete/manager/src/Makefile
components/devicesobsolete/cd/Makefile
components/devicesobsolete/cd/public/Makefile
components/devicesobsolete/cd/src/Makefile
components/devicesobsolete/download/Makefile
components/devicesobsolete/download/public/Makefile
components/devicesobsolete/download/src/Makefile
components/devicesobsolete/wm/Makefile
components/devicesobsolete/wm/public/Makefile
components/devicesobsolete/wm/src/Makefile
components/devicesobsolete/usb_mass_storage/Makefile
components/devicesobsolete/usb_mass_storage/public/Makefile
components/devicesobsolete/usb_mass_storage/src/Makefile
"

MAKEFILES_featherscomponent="
components/feathers/Makefile
components/feathers/public/Makefile
"


MAKEFILES_integration="
components/integration/Makefile
components/integration/public/Makefile
components/integration/src/Makefile
components/integration/src/linux/Makefile
components/integration/src/macosx/Makefile
components/integration/src/win32/Makefile
"

MAKEFILES_mediacore="
components/mediacore/Makefile
components/mediacore/metadata/Makefile
components/mediacore/metadata/handler/Makefile
components/mediacore/metadata/handler/id3/Makefile
components/mediacore/metadata/handler/id3/public/Makefile
components/mediacore/metadata/handler/id3/src/Makefile
components/mediacore/metadata/handler/mp4/Makefile
components/mediacore/metadata/handler/mp4/src/Makefile
components/mediacore/metadata/handler/ogg/Makefile
components/mediacore/metadata/handler/ogg/public/Makefile
components/mediacore/metadata/handler/ogg/src/Makefile
components/mediacore/metadata/handler/wma/public/Makefile
components/mediacore/metadata/handler/wma/Makefile
components/mediacore/metadata/handler/wma/src/Makefile
components/mediacore/metadata/manager/Makefile
components/mediacore/metadata/manager/public/Makefile
components/mediacore/metadata/manager/src/Makefile
components/mediacore/transcoding/Makefile
components/mediacore/transcoding/public/Makefile
components/mediacore/transcoding/src/Makefile
components/mediacore/playback/Makefile
components/mediacore/playback/gstreamer/Makefile
components/mediacore/playback/gstreamer/public/Makefile
components/mediacore/playback/gstreamer/src/Makefile
components/mediacore/playback/quicktime/Makefile
components/mediacore/playback/quicktime/public/Makefile
components/mediacore/playback/quicktime/src/Makefile
"

MAKEFILES_medialibrary="
components/medialibrary/Makefile
components/medialibrary/public/Makefile
components/medialibrary/src/Makefile
"

MAKEFILES_metrics="
components/metrics/Makefile
components/metrics/public/Makefile
components/metrics/src/Makefile
"

MAKEFILES_playlistplayback="
components/playlistplayback/Makefile
components/playlistplayback/src/Makefile
components/playlistplayback/public/Makefile
"

MAKEFILES_playlistreader="
components/playlistreader/Makefile
components/playlistreader/m3u/Makefile
components/playlistreader/m3u/public/Makefile
components/playlistreader/m3u/src/Makefile
components/playlistreader/pls/Makefile
components/playlistreader/pls/public/Makefile
components/playlistreader/pls/src/Makefile
"

MAKEFILES_playlistsource="
components/playlistsource/Makefile
components/playlistsource/public/Makefile
components/playlistsource/src/Makefile
"

MAKEFILES_servicesource="
components/servicesource/Makefile
components/servicesource/public/Makefile
components/servicesource/src/Makefile
"

MAKEFILES_state="
components/state/Makefile
components/state/public/Makefile
components/state/src/Makefile
components/state/tests/Makefile
"

MAKEFILES_testharness="
components/testharness/Makefile
components/testharness/basetests/Makefile
components/testharness/public/Makefile
components/testharness/src/Makefile
"

MAKEFILES_update="
update/Makefile
"

MAKEFILES_faceplateregistration="
components/faceplateregistration/Makefile
components/faceplateregistration/public/Makefile
components/faceplateregistration/src/Makefile
"

MAKEFILES_library="
components/library/Makefile
components/library/base/Makefile
components/library/base/public/Makefile
components/library/localdatabase/Makefile
components/library/localdatabase/public/Makefile
"

MAKEFILES_property="
components/property/Makefile
components/property/public/Makefile
"

MAKEFILES_sqlbuilder="
components/sqlbuilder/Makefile
components/sqlbuilder/public/Makefile
components/sqlbuilder/src/Makefile
components/sqlbuilder/test/Makefile
"

#
# Put it all together
#

add_makefiles "
$MAKEFILES_app
$MAKEFILES_build
$MAKEFILES_components
$MAKEFILES_dependencies
$MAKEFILES_feathers
$MAKEFILES_installer
$MAKEFILES_locales
$MAKEFILES_bundle
$MAKEFILES_commandline
$MAKEFILES_controller
$MAKEFILES_dataremote
$MAKEFILES_dbengine
$MAKEFILES_devicesobsolete
$MAKEFILES_featherscomponent
$MAKEFILES_integration
$MAKEFILES_mediacore
$MAKEFILES_medialibrary
$MAKEFILES_metrics
$MAKEFILES_playlistplayback
$MAKEFILES_playlistreader
$MAKEFILES_playlistsource
$MAKEFILES_servicesource
$MAKEFILES_state
$MAKEFILES_testharness
$MAKEFILES_update
$MAKEFILES_faceplateregistration
$MAKEFILES_property
$MAKEFILES_sqlbuilder
$MAKEFILES_library
"


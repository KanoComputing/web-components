modulizer --out . \
--npm-name @kano/web-components \
--npm-version 3.0.0-beta.1 \
--dependency-mapping kwc-style,@kano/kwc-style,^3.0.0-beta.1 \
--dependency-mapping kwc-icons,@kano/kwc-icons,^3.0.0-beta.1 \
--dependency-mapping platform.js,platform,^1.3.5 \
--dependency-mapping js-md5,blueimp-md5,^2.10

sed -i "s|build/md5.min.js|js/md5.js|g" kano-tracking/kano-tracking-behavior.js

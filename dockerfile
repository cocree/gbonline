FROM cocree/contao-basic-image:4.4.42-ohne-msmtp

RUN composer require contao-bootstrap/bundle terminal42/contao-easy_themes terminal42/contao-mailusername madeyourday/contao-rocksolid-custom-elements con4gis/maps srhinow/srlayer metamodels/core -d contao

RUN rm -fr var/cache/*

# Link the console cmd
RUN mkdir bin \
    && ln -s ./../vendor/bin/contao-console bin/console

# we make sure everything is writeable also for connected containers. it's ok because it's just for local development
# and not prod use
RUN chmod -R 0777 . \
    && chown -R www-data:www-data .

EXPOSE 80
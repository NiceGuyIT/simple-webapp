#!/usr/bin/env bash

app=bapi

# Skip API until auth is figured out.
buffalo new $app --api --db-type postgres --skip-yarn
#buffalo new $app --db-type postgres --skip-yarn

rm -rf $app/.git
mv $app/* .
mv $app/.[a-z]* .
rmdir $app

# Commit the changes
# Add database info

# https://github.com/gobuffalo/buffalo-auth
buffalo plugins install github.com/gobuffalo/buffalo-auth
buffalo generate auth first_name last_name notes:text
buffalo pop migrate status
buffalo pop migrate up

buffalo pop generate model --help
buffalo pop generate model address
buffalo pop generate model client
buffalo pop generate model material
buffalo pop generate model service_call
buffalo pop generate model role

buffalo generate resource address --use-model address name:string type:string address1:string address2:string city:string state:string zip:string
buffalo generate resource client --use-model client name:string phone:string email:string
buffalo generate resource material --use-model material name:string source:string
buffalo generate resource service_call --use-model service_call name:string date:date start_time:time.Time stop_time:time.Time reason:string work_performed:string

buffalo pop migrate up

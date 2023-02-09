# Welcome to Buffalo

Thank you for choosing Buffalo for your web development needs.

## Embedding

See [this issue](https://github.com/gobuffalo/buffalo/issues/1916) for embedding assets.

## Quick start guide

```bash
buffalo new webapp --api --db-type postgres --skip-yarn
rm -rf webapp/.git
cd webapp

buffalo plugins install github.com/gobuffalo/buffalo-auth
buffalo generate auth
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
```

## Other

- [Free IP Lookup](https://freeiplookupapi.com/)

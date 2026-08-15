Built on Layered Architecture

Main Container Component {connects everything between all four layers.}
1. Data for local Storage which can be replaced with database api
2. Service for writing function logic only for {Create}{Remove}{Update}{Delete}
3. hooks for the bridge between Service Request & data manipulation when reqested
4. Dumb components {calls callbackfunctions when data is changed.}


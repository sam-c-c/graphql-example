export const typeDef = `
    extend type Query {
        rockets: [Rocket],
        rocket(id: String!): Rocket
    }

    type Dimensions {
        "The dimension in meters"
        meters: Float
        "The dimension in feet"
        feet: Float
    }

    type Mass {
        "The mass of the rocket in kg"
        kg: Float
        "The mass of the rocket in lb"
        lb: Float
    }

    "The Rocket type"
    type Rocket {
        "The id of the rocket"
        id: String!
        "The name of the rocket"
        name: String
        "The type"
        type: String
        "Is the rocket still active"
        active: Boolean
        "The number of stages the rocket has"
        stages: Int
        "The number of boosters the rocket has"
        boosters: Int
        "The cost to launch the rocket"
        costPerLaunch: Int
        "The success rate of launches as a percentage"
        successRate: Int
        "The height of the rocket"
        height: Dimensions
        "The diameter of the rocket"
        diameter: Dimensions
        "The mass of the rocket"
        mass: Mass
    }
`;
function mapRocketFields(obj) {
    obj["costPerLaunch"] = obj["cost_per_launch"];
    obj["successRate"] = obj["success_rate_pct"];
    delete obj["cost_per_launch"];
    delete obj["success_rate_pct"];
}
async function getRocketData(url) {
    let response = await fetch(url);
    let rocketsJson = await response.json();
    return JSON.parse(JSON.stringify(rocketsJson));
}
export const resolvers = {
    Query: {
        rockets: async (parent, args, contextValue, info) => {
            let rockets = await getRocketData("https://api.spacexdata.com/v4/rockets");
            rockets.forEach(x => mapRocketFields(x));
            return rockets;
        },
        rocket: async (parent, args, contextValue, info) => {
            let rocket = await getRocketData(`https://api.spacexdata.com/v4/rockets/${args.id}`);
            mapRocketFields(rocket);
            return rocket;
        }
    }
};

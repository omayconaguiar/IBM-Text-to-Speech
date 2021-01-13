import * as Knex from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("vxtel").del();

    // Inserts seed entries
    await knex("vxtel").insert([
        { origin: '011', destiny: '016', per_hour: '1.90' },
        { origin: '016', destiny: '011', per_hour: '2.90' },
        { origin: '011', destiny: '017', per_hour: '1.70' },
        { origin: '017', destiny: '011', per_hour: '2.70' },
        { origin: '011', destiny: '018', per_hour: '0.90' },
        { origin: '018', destiny: '011', per_hour: '1.90' },
    ]);
};


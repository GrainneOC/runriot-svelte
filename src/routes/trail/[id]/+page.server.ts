// src/routes/trail/[id]/+page.server.ts

import { runriotService } from "$lib/services/runriot-service";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
    const trail = await runriotService.getTrail(params.id);
    return { trail };
};
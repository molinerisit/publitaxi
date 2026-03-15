import { supabaseAdmin } from "@/lib/supabaseServer";

export const BASE_REGISTERED_TAXIS = 40;

export async function getRegisteredTaxisCount() {
  if (!supabaseAdmin) {
    return BASE_REGISTERED_TAXIS;
  }

  const { count, error } = await supabaseAdmin
    .from("taxi_drivers")
    .select("id", { count: "exact", head: true });

  if (error) {
    return BASE_REGISTERED_TAXIS;
  }

  return BASE_REGISTERED_TAXIS + (count ?? 0);
}

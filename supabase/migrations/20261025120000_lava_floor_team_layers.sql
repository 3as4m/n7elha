-- Lava Floor, team mode: a right answer lays a whole course on the team's tower
-- instead of one brick of it, so the team steps up on every answer. Height is
-- still base + floor(bricks / width); a team answer now adds `width` bricks.
-- Class and solo towers are unchanged (one brick per answer). Mirrors
-- bricksPerAnswer() in src/lib/lavaFloor.ts.

create or replace function public.lava_floor_answer(p_student_id uuid, p_correct boolean)
returns void
language plpgsql security definer set search_path = public as $$
declare v_tower uuid; v_session uuid; v_mode text;
begin
  update game_students
     set total_answers   = total_answers + 1,
         correct_answers = correct_answers + (case when p_correct then 1 else 0 end),
         crypto          = crypto + (case when p_correct then 1 else 0 end),
         streak          = case when p_correct then streak + 1 else 0 end
   where id = p_student_id
   returning lf_tower, session_id into v_tower, v_session;
  if p_correct and v_tower is not null then
    select settings->>'lfMode' into v_mode from game_sessions where id = v_session;
    update lava_towers
       set bricks = bricks + (case when dunked then 0 when v_mode = 'teams' then greatest(1, width) else 1 end),
           climb  = climb  + (case when dunked then 1 else 0 end)
     where id = v_tower;
  end if;
end $$;

grant execute on function public.lava_floor_answer(uuid, boolean) to anon, authenticated;

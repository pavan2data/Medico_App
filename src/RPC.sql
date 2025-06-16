create or replace function array_append_if_not_exists(arr date[], value date)
returns date[] as $$
begin
  if not value = any(arr) then
    return array_append(arr, value);
  else
    return arr;
  end if;
end;
$$ language plpgsql;

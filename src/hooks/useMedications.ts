import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';

export const useMedications = (userId: string) =>
  useQuery({
    queryKey: ['medications', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('medications')
        .select('*')
        .eq('user_id', userId);
      if (error) throw error;
      return data;
    },
  });

export const useAddMedication = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: {
      user_id: string;
      name: string;
      dosage: string;
      frequency: string;
    }) => {
      const { error } = await supabase.from('medications').insert(payload);
      if (error) throw error;
    },
    onSuccess: (_, vars) =>
      queryClient.invalidateQueries({ queryKey: ['medications', vars.user_id] }),
  });
};

export const useMarkTaken = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, date }: { id: string; date: string }) => {
      const { data, error } = await supabase
        .from('medications')
        .update({ taken_on: supabase.rpc('array_append_if_not_exists', { arr: 'taken_on', value: date }) })
        .eq('id', id);
      if (error) throw error;
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['medications'] }),
  });
};

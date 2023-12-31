import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import { Work, Degree } from 'src/types/types';

export const useFormStore = defineStore('form', () => {
  const form = ref({
    firstname: '',
    lastname: '',
    birthdate: '',
    bio: '',
    published_works_count: 0,
    published_works: [] as Work[],
    professional: {
      english: 0 as number,
      french: 0 as number,
      german: 0 as number,
      degrees: [] as Degree[],
    },
  });

  const resetForm = () => {
    form.value.firstname = '';
    form.value.lastname = '';
    form.value.birthdate = '';
    form.value.bio = '';
    form.value.published_works_count = 0;
    form.value.professional.english = 0;
    form.value.professional.french = 0;
    form.value.professional.german = 0;
    form.value.professional.degrees = [];
  };

  watch(
    () => form.value.published_works_count,
    (value) => {
      if (value === 0) {
        form.value.published_works = [];
      } else {
        form.value.published_works = Array(value)
          .fill(undefined)
          .map(() => {
            return {
              id: uuidv4(),
              title: '',
              year: 2023,
              link: '',
            } as Work;
          });
      }
    }
  );

  watch(
    () => form.value.published_works_count,
    (value) => {
      if (value > 3) {
        form.value.published_works_count = 3;
      }
    }
  );

  return { form, resetForm };
});

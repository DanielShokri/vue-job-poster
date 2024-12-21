<script setup lang="ts">
import { ref, computed } from "vue";
import { useToast } from "@/hooks/useToast";
const toast = useToast()

const job = ref({
  title: "",
  company: "",
  location: "",
  employment_type: "",
  salary_from: 0,
  salary_to: 0,
  job_category: "",
  number_of_opening: 1,
  contact: "",
  application_deadline: "",
  is_remote_work: 0,
  description: "",
  qualifications: [] as string[],
  created_at: "",
  updated_at: "",
  id: "",
});

const qualificationsText = computed({
  get: () => job.value.qualifications.join("\n"),
  set: (val: string) => {
    job.value.qualifications = val.split("\n").filter((q) => q.trim());
  },
});

const submitJob = () => {
  // Convert checkbox to number
  job.value.is_remote_work = job.value.is_remote_work ? 1 : 0;

  // Add timestamps
  job.value.created_at = new Date().toISOString();
  job.value.updated_at = new Date().toISOString();

  console.log("Submitting job:", job.value);
  // submission logic
  toast.show({
    message: Object.entries(job.value)
    .map(([key, value]) => `${key}: ${value}`)
    .join(', '),
    type: "success",
    position: "top-right",
    duration: 10000,
  });
};
</script>

<template>
  <section class="bg-white dark:bg-gray-900">
    <div class="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
      <h2
        class="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white"
      >
        Post a New Job
      </h2>
      <p
        class="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl"
      >
        Create a new job listing
      </p>

      <form @submit.prevent="submitJob" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Job Title -->
          <div>
            <label
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >Job Title</label
            >
            <input
              v-model="job.title"
              type="text"
              class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
              required
            />
          </div>

          <!-- Company -->
          <div>
            <label
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >Company Name</label
            >
            <input
              v-model="job.company"
              type="text"
              class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
              required
            />
          </div>

          <!-- Location -->
          <div>
            <label
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >Location</label
            >
            <input
              v-model="job.location"
              type="text"
              class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
              required
            />
          </div>

          <!-- Employment Type -->
          <div>
            <label
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >Employment Type</label
            >
            <select
              v-model="job.employment_type"
              class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
              required
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Temporary">Temporary</option>
            </select>
          </div>

          <!-- Salary Range -->
          <div>
            <label
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >Salary From</label
            >
            <input
              v-model.number="job.salary_from"
              type="number"
              class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
              required
            />
          </div>

          <div>
            <label
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >Salary To</label
            >
            <input
              v-model.number="job.salary_to"
              type="number"
              class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
              required
            />
          </div>

          <!-- Job Category -->
          <div>
            <label
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >Job Category</label
            >
            <input
              v-model="job.job_category"
              type="text"
              class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
              required
            />
          </div>

          <!-- Number of Openings -->
          <div>
            <label
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >Number of Openings</label
            >
            <input
              v-model.number="job.number_of_opening"
              type="number"
              class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
              required
            />
          </div>

          <!-- Contact -->
          <div>
            <label
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >Contact Phone</label
            >
            <input
              v-model="job.contact"
              type="tel"
              class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
              required
            />
          </div>

          <!-- Application Deadline -->
          <div>
            <label
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >Application Deadline</label
            >
            <input
              v-model="job.application_deadline"
              type="date"
              class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
              required
            />
          </div>
        </div>

        <!-- Remote Work -->
        <div class="flex items-center">
          <input
            v-model="job.is_remote_work"
            type="checkbox"
            class="w-4 h-4 text-primary-600 bg-gray-100 rounded border-gray-300 focus:ring-primary-500"
          />
          <label
            class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Remote Work Available</label
          >
        </div>

        <!-- Description -->
        <div>
          <label
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
            >Job Description</label
          >
          <textarea
            v-model="job.description"
            rows="4"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
            required
          ></textarea>
        </div>

        <!-- Qualifications -->
        <div>
          <label
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
            >Qualifications (one per line)</label
          >
          <textarea
            v-model="qualificationsText"
            rows="4"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          class="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          Post Job
        </button>
      </form>
    </div>
  </section>
</template>

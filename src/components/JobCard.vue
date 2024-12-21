<script setup lang="ts">
import Tooltip from "./ToolTip.vue";
import { defineProps, computed } from "vue";

interface JobCardProps {
  title: string;
  description: string;
  location: string;
  salaryFrom: number;
  salaryTo: number;
  type: string;
  jobId: string;
}

const props = defineProps<JobCardProps>();

const formattedSalaryFrom = computed(() => {
  return `$${props.salaryFrom?.toLocaleString()}`;
});

const formattedSalaryTo = computed(() => {
  return `$${props.salaryTo?.toLocaleString()}`;
});
</script>

<template>
  <div class="bg-white rounded-lg shadow-md p-6 text-left flex flex-col h-full">
    <!-- Main content wrapper -->
    <div class="flex-grow">
      <p>{{ type }}</p>
      <p class="text-2xl font-bold mb-3">{{ title }}</p>
      <p class="mb-4">{{ description }}</p>
      <p class="text-green-500 font-semibold">
        {{ formattedSalaryFrom }} - {{ formattedSalaryTo }} / Year
      </p>
    </div>

    <!-- Footer section -->
    <div class="mt-auto">
      <div class="border-t border-dashed border-gray-400 my-6"></div>
      <div class="flex justify-between items-center">
        <Tooltip :text="location" position="top">
          <div class="flex items-center space-x-1">
            <svg
              class="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fill-rule="evenodd"
                d="M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.309-.38l-.133-.163a.999.999 0 0 1-.13-.202 7.995 7.995 0 0 1 6.498-12.518ZM15 9.997a3 3 0 1 1-5.999 0 3 3 0 0 1 5.999 0Z"
                clip-rule="evenodd"
              />
            </svg>

            <p
              class="truncate max-w-[150px] hover:cursor-pointer"
              :title="location"
            >
              {{ location }}
            </p>
          </div>
        </Tooltip>
        <RouterLink
          :to="{
            name: 'JobDetail',
            params: {
              id: jobId,
            },
          }"
          type="button"
          class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Read More
        </RouterLink>
      </div>
    </div>
  </div>
</template>

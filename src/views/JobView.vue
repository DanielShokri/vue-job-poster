<script setup lang="ts">
import { computed } from "vue";
import { useJobsStore } from "@/store/jobsStore/jobs";
import { useRoute } from "vue-router";
const jobStore = useJobsStore();

// Access the route object
const route = useRoute();
const jobId = route.params.id as string; // Cast to string or number as needed

console.log("Job ID from URL:", jobId);
const job = jobStore.getJobById(jobId);
console.log("Job details:", job);

const formattedSalaryFrom = computed(() => {
  return `$${job?.salary_from?.toLocaleString()}`;
});

const formattedSalaryTo = computed(() => {
  return `$${job?.salary_to?.toLocaleString()}`;
});

const qualifications = computed(() => {
  console.log("Raw description:", job?.qualifications);
  if (typeof job?.qualifications === "string") {
    try {
      const skills = JSON.parse(job.qualifications);
      return skills.map((skill: string) => `• ${skill}`).join("<br>");
    } catch (error) {
      console.error("Failed to parse description as JSON:", error);
      return "";
    }
  }
  return "";
});
</script>

<template>
  <main class="container mx-auto py-8">
    <div class="grid md:grid-cols-3 gap-6">
      <!-- Job Info -->
      <div class="md:col-span-2 bg-white p-6 rounded-lg shadow-lg">
        <p class="text-sm text-green-700 font-semibold">
          {{ job?.employment_type }} - {{ job?.job_category }}
        </p>
        <h2 class="text-3xl font-bold text-green-800 mt-2">
          {{ job?.title }}
        </h2>
        <p class="text-gray-600 mt-1">{{ job?.location }}</p>

        <div class="mt-6">
          <h3 class="text-lg font-bold text-green-700">Job Description</h3>
          <p class="text-gray-700 mt-2">
            {{ job?.description }}
          </p>

          <p class="text-lg font-bold text-green-700 mt-4">Salary</p>
          <p class="text-gray-700">
            {{ formattedSalaryFrom }} - {{ formattedSalaryTo }} / Year
          </p>
        </div>
      </div>

      <div class="space-y-6">
        <!-- Company Info -->
        <div class="bg-white p-6 rounded-lg shadow-lg">
          <h3 class="text-2xl font-bold text-green-800">
            Company - {{ job?.company }}
          </h3>
          <p class="text-gray-700 mt-2" v-html="qualifications"></p>

          <div class="mt-6">
            <p class="font-bold text-gray-800">Created At:</p>
            <p class="text-green-700">{{ job?.created_at }}</p>

            <p class="font-bold text-gray-800 mt-4">Contact Phone:</p>
            <p class="text-green-700">{{ job?.contact }}</p>
          </div>
        </div>

        <!-- Manage Job -->
        <div class="bg-white p-6 rounded-lg shadow-lg justify-items-center">
          <p class="text-gray-800 text-lg font-bold mb-2">Manage Job</p>
          <div class="flex justify-end gap-4">
            <button class="bg-green-500 text-white px-4 py-2 rounded shadow">
              Edit Job
            </button>
            <button class="bg-red-500 text-white px-4 py-2 rounded shadow">
              Delete Job
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import JobCard from "@/components/JobCard.vue";
import Loading from "@/components/Loading.vue";
import { useJobsStore } from "../store/jobsStore/jobs";
const props = defineProps<{
  limit: number; // Optional prop
  showAllButton: boolean; // Optional prop
}>();

// Reactive state variables
const jobs = ref([]);
const isLoading = ref(true);
const error = ref<string | null>(null);
const jobStore = useJobsStore();

async function fetchJobs() {
  try {
    const url = "https://jsonfakery.com/jobs/simple-paginate";

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Fetched Data:", data); // Console log the result
    const finalData = props.limit ? data.data.slice(0, props.limit) : data.data;
    jobs.value = finalData;
    jobStore.setJobsData(finalData); // Set the jobs to the store
  } catch (err) {
    error.value = err.message;
  } finally {
    isLoading.value = false;
  }
}

onMounted(fetchJobs);
</script>

<template>
  <section class="bg-green-300" :class="{ 'mt-4': $route.path === '/' }">
    <div class="container mx-auto py-12 px-4 md:px-0">
      <h1 class="text-center text-green-800 font-bold text-3xl mb-8">
        Job Listings
      </h1>
      <div v-if="isLoading" class="flex justify-center items-center">
        <Loading />
      </div>
      <div
        v-else-if="error"
        class="text-center text-white font-bold text-xl mt-4"
      >
        {{ error }}
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <JobCard
          v-for="(job, index) in jobs"
          :key="job.id"
          :title="job.title"
          :description="job.description"
          :salaryFrom="job.salary_from"
          :salaryTo="job.salary_to"
          :type="job.employment_type"
          :location="job.location"
          :jobId="job.id"
        ></JobCard>
      </div>
    </div>
  </section>

  <div class="flex justify-center">
    <router-link
      v-if="showAllButton"
      to="/jobs"
      class="my-4 inline-block w-56 px-6 py-3.5 text-base font-medium text-white bg-gray-800 hover:bg-gray-700 rounded-lg text-center"
    >
      Show all Jobs
    </router-link>
  </div>
</template>

<template>
  <div class="flex gap-3 justify-center mt-4 flex-col items-center px-2 md:px-0 md:flex-row">
      <Card
        title="For Devlopers"
        subtitle="Browse our Vue jobs and start your career today"
        buttonText="Browse Jobs"
        toLink="/jobs"
      />
      <Card
        title="For Employers"
        subtitle="List your job to find the perfect devloper for the role"
        buttonText="Add Job"
        bgColor="bg-green-100"
        toLink="/jobs/add"
      />
  </div>
</template>

<script setup>
import Card from "@/components/Card.vue";
</script>

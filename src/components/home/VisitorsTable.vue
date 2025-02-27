<script setup lang="ts">
import { ref, onMounted } from "vue";
import { api } from "../../services/api";

interface Visitor {
  id: string;
  username: string;
  onlineTime: string;
  country: string;
  city: string;
}

const visitors = ref<Visitor[]>([]);
const isLoading = ref(false);
const error = ref<string | null>(null);
const sortBy = ref("default");

const fetchVisitors = async () => {
  try {
    isLoading.value = true;
    const response = await api.getVisitors();
    visitors.value = response.visitors;
  } catch (err) {
    error.value = "Failed to load visitors data";
    console.error("Error fetching visitors:", err);
  } finally {
    isLoading.value = false;
  }
};

const handleSort = (event: Event) => {
  const value = (event.target as HTMLSelectElement).value;
  sortBy.value = value;
  if (value !== "default") {
    visitors.value.sort((a, b) => {
      if (value === "onlineTime")
        return a.onlineTime.localeCompare(b.onlineTime);
      if (value === "country") return a.country.localeCompare(b.country);
      if (value === "city") return a.city.localeCompare(b.city);
      if (value === "username") return a.username.localeCompare(b.username);
      return 0;
    });
  } else {
    visitors.value.sort((a, b) => a.id.localeCompare(b.id));
  }
};

onMounted(() => {
  fetchVisitors();
});
</script>

<template>
  <div class="visitors-list bg-white rounded-lg shadow p-6 pb-1 w-2/3">
    <div class="flex justify-between items-center mb-3">
      <div class="flex gap-1">
        <div class="text-lg text-black">Today</div>
        /
        <div class="text-lg text-gray-500">Week</div>
        /
        <div class="text-lg text-gray-500">Month</div>
      </div>
      <div class="flex gap-2">
        <button class="text-gray-500">Sort by</button>
        <select
          v-model="sortBy"
          @change="handleSort"
          class="text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="default">Default</option>
          <option value="onlineTime">Online Time</option>
          <option value="country">Country</option>
          <option value="city">City</option>
          <option value="username">User</option>
        </select>
      </div>
    </div>

    <div v-if="isLoading" class="text-center py-4">Loading visitors...</div>

    <div v-else-if="error" class="text-red-500 text-center py-4">
      {{ error }}
    </div>

    <div v-else class="overflow-x-auto">
      <table class="w-full font-medium">
        <thead>
          <tr class="text-left text-gray-500">
            <th>User List</th>
            <th>Online Time</th>
            <th>Country</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 text-black">
          <tr v-for="visitor in visitors" :key="visitor.id">
            <td
              class="py-3"
              :class="
                visitor.username === 'Unknown'
                  ? 'text-gray-500'
                  : 'text-blue-500'
              "
            >
              <span class="text-gray-500">{{ visitor.id }}.</span>
              {{ visitor.username }}
            </td>
            <td>{{ visitor.onlineTime }}</td>
            <td>{{ visitor.country }}</td>
            <td>{{ visitor.city }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

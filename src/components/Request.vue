<template>
  <div>
    <div class="p-grid">
      <div class="p-col-12">
        <h2 class="title">All requests</h2>
      </div>
    </div>
    <div class="p-grid filter-container">
      <div class="filter-inputs">
        <span>Filters</span>
        <span class="p-input-icon-right p-mx-4">
            <InputText v-model="textSearch" placeholder="Name" type="text"/>
            <i v-if="textSearch" class="pi pi-times clear-filter-input" v-on:click="clearFilterInput()"/>
        </span>
        <Dropdown v-model="selectedBrand" :filter="true" :options="brands"
                  :showClear="true" optionLabel="name" placeholder="-Brand-"/>
      </div>
      <Button class="p-button-secondary" label="Filter" v-on:click="filterRequests()"/>
    </div>
    <DataView :layout="'list'" :paginator="true" :rows="4" :value="requests">
      <template #list="slotProps" class="p-grid">
        <div class="p-col-12 p-md-12 p-lg-12">
          <div class="request-list-item p-grid" v-on:click="openEditModal(slotProps.data)">
            <div class="request-status p-col-2">
              <img v-bind:src="setStatus(slotProps.data.requestStatus.name)"/>
              <span>{{ slotProps.data.requestStatus.value }}</span>
            </div>
            <div class="p-col-3">
              {{ slotProps.data.campaignName }}
            </div>
            <div class="p-col-2">
             <span :class="'status-'+slotProps.data.advice">
               {{ slotProps.data.advice ? 'Advice' : 'Request' }}
             </span>
            </div>
            <div class="p-col-2">
              {{ slotProps.data.brand.name }}
            </div>
            <div class="p-col-2">
              {{ formatDate(slotProps.data.submittedDate) }}
            </div>
            <div class="p-col-1 img-next-container">
              <img src="../assets/images/next.png"/>
            </div>
          </div>
        </div>
      </template>
      <template #empty>No request found.</template>
    </DataView>
    <EditRequest :brands="brands"
                 :displayEditDialog.sync="displayEditDialog"
                 :medias="medias"
                 :selectedRequest.sync="selectedRequest"
                 @editRequest="editRequest"/>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import RequestService from "../services/request.service";
import moment from 'moment';
import EditRequest from "@/components/EditRequest.vue";

@Component({
  components: {
    EditRequest
  }
})

export default class Request extends Vue {
  requests: any[] = [];
  allRequests: any[] = [];
  brands: any[] = [];
  medias: any[] = [];
  displayEditDialog = false;
  selectedRequest = {};
  textSearch = null;
  selectedBrand = null;
  private requestService: RequestService = new RequestService();

  mounted(): void {
    this.getRequests();
    this.getBrands();
    this.getMedias();
  }

  openEditModal(data: any) {
    this.displayEditDialog = true;
    this.selectedRequest = data;
  }

  getRequests() {
    this.requestService.getRequests().then((data: any) => {
      this.requests = data.requests;
      this.allRequests = Array.from(this.requests);
    });
  }

  getBrands() {
    this.requestService.getBrands().then((data: any) => {
      this.brands = data
    });
  }

  getMedias() {
    this.requestService.getMedias().then((data: any) => {
      this.medias = data
    });
  }

  formatDate(value: any): any {
    if (value) {
      return moment(String(value)).format('MMM Do YYYY')
    }
  }

  setStatus(value: any): any {
    let img;
    switch (value) {
      case 'SUBMITTED':
        img = require("../assets/images/submit.png");
        break;
      case 'PENDING':
        img = require("../assets/images/sand-clock.png");
        break;
      case 'REJECTED':
        img = require("../assets/images/annuler.png");
        break;
      case 'TO_REVIEW':
        img = require("../assets/images/sand-clock.png");
        break;
      case 'VALIDATED':
        img = require("../assets/images/check-mark.png");
        break;
      case 'TO_MODIFY':
        img = require("../assets/images/edit.png");
        break;
      case 'DRAFT':
        img = require("../assets/images/draw.png");
        break;
      default:
    }
    return img;
  }

  editRequest(request: any): void {
    console.log(request);
    this.displayEditDialog = false;
  }

  clearFilterInput() {
    this.textSearch = null;
  }

  filterRequests() {
    if (this.textSearch && !this.selectedBrand) {
      this.requests = this.filterByTextSearch(this.allRequests, this.textSearch);
    } else if (this.selectedBrand && !this.textSearch) {
      this.requests = this.filterByAttribute(this.allRequests, "brand", this.selectedBrand);
    } else if (this.textSearch && this.selectedBrand) {
      this.requests = this.filterByAttribute(this.allRequests, "brand", this.selectedBrand);
      this.requests = this.filterByTextSearch(this.requests, this.textSearch);
    } else {
      this.requests = this.allRequests;
    }
  }

  filterByTextSearch(items: any, searchItem: any) {
    return items.filter((obj: any) => Object.values(obj).flat().some((v) => `${v}`.toLowerCase().includes(searchItem.toLowerCase())));
  }

  filterByAttribute(items: any, attr: any, searchItem: any) {
    return items.filter((obj: any) => (JSON.stringify(obj[attr]) == JSON.stringify(searchItem)));
  }
}
</script>

<style scoped>
.title {
  color: #9fafc5;
}

/deep/ .request-list-item {
  display: flex;
  align-items: center;
  padding: 1rem;
  background-color: #f2f9ff;
  margin: 10px;
  border-radius: 15px;
}

/deep/ .request-list-item:hover,
.clear-filter-input:hover {
  cursor: pointer;
}

/deep/ .p-dataview.p-dataview-list .p-dataview-content > .p-grid > div {
  border: none !important;
}

/deep/ .p-dataview .p-dataview-header {
  background: #fff !important;
  color: #495057;
  border: 1px solid #e9ecef;
  border-width: 1px 0 1px 0;
  padding: 1rem 1rem;
  font-weight: 400 !important;
}

/deep/ .p-dataview-emptymessage {
  text-align: center;
  font-size: 18px;
}

.request-status {
  display: inline-grid;
  grid-row-gap: 10px;
  padding: 10px;
  border-right: 2px solid #bbbfc3;
  width: 150px;
  justify-content: center;
}

.img-next-container {
  text-align: end;
}

.filter-container {
  padding: 10px 20px;
  align-items: center;
  display: flex;
  justify-content: space-between;
}

.status-true {
  background-color: #e02c73;
  color: white;
  padding: 3px 8px;
}

.status-false {
  background-color: #7388a7;
  color: white;
  padding: 3px 8px;
}
</style>

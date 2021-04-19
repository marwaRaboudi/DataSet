<template>
  <Dialog :maximizable="true" :modal="true" :style="{width: '50vw'}" :visible.sync="display">
    <template #header>
      <h3>Edit</h3>
    </template>
    <form v-if="request" @submit.prevent="emitRequest">
      <div class="p-field p-grid">
        <label class="p-col-4" for="brand">Brand</label>
        <Dropdown id="brand" v-model="request.brand" :options="brands" class="p-col-8" optionLabel="name"
                  placeholder="Select a Brand"/>
      </div>
      <div class="p-fluid p-grid">
        <label class="p-col-12" for="campaignName">Campaign name</label>
        <InputText id="campaignName" v-model="request.campaignName" class="p-col-12" type="text"/>
      </div>
      <div class="p-fluid p-grid p-mt-2">
        <label class="p-col-12">Media</label>
        <div v-for="media in medias" v-bind:key="media.mediaId" class="p-field-checkbox p-col-6">
          <Checkbox :id="media.mediaId" v-model="request.media" :value="media"/>
          <label :for="media.mediaId">{{ media.value }}</label>
        </div>
      </div>
      <div class="p-fluid p-grid">
        <label class="p-col-12" for="decisionDeadline">Deadline for decision</label>
        <Calendar id="decisionDeadline" v-model="request.decisionDeadline" class="p-col-6" dateFormat="dd M yy"/>
      </div>
      <div class="dialog-footer">
        <Button class="p-button-text" icon="pi pi-times" label="Cancel" @click="display=false"/>
        <Button icon="pi pi-check" label="Edit" type="submit"/>
      </div>
    </form>
  </Dialog>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import moment from "moment";

@Component
export default class EditRequest extends Vue {

  @Prop() displayEditDialog: any;
  @Prop() selectedRequest: any;
  @Prop() brands: any;
  @Prop() medias: any;

  get display() {
    return this.displayEditDialog;
  }

  set display(newValue: string) {
    this.$emit('update:displayEditDialog', newValue);
  }

  get request() {
    return this.selectedRequest;
  }

  set request(newValue: string) {
    this.$emit('update:request', newValue);
  }

  emitRequest(): void {
    this.$emit('editRequest', this.request);
  }

  formatDate(value: any): any {
    if (value) {
      return moment(String(value)).format('dd M yy')
    }
  }

}
</script>

<style scoped>
/deep/ .p-dialog .p-dialog-content {
  padding: 0 3rem 2rem 3rem !important;
}

.dialog-footer {
  text-align: end;
  padding: 20px 0;
}
</style>

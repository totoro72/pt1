import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Item, SaveItem } from "../types";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "app-new-edit-modal",
  templateUrl: "./new-edit-modal.component.html",
  styleUrls: ["./new-edit-modal.component.scss"]
})
export class NewEditModalComponent implements OnInit {
  @Output() updateItemEvent: EventEmitter<SaveItem> = new EventEmitter<
    SaveItem
  >();

  constructor(public activeModal: NgbActiveModal) {}
  // modal input
  item: Item = null;
  itemIndex: number = null;
  allCategories: string[];

  itemFG: FormGroup = new FormGroup({
    name: new FormControl(),
    category: new FormControl(),
    imgUrl: new FormControl()
  });

  ngOnInit() {
    // assign input data
    console.log("got input item", this.item);
    if (this.item) {
      // assign values to form group
      const item: Item = this.item;
      this.itemFG.get("category").setValue(item.category);
      this.itemFG.get("imgUrl").setValue(item.imgUrl);
    }
  }

  get titleText(): string {
    if (this.itemIndex !== null) {
      return "Edit Item";
    }
    return "Add Item";
  }

  get selectedCategory(): string {
    return this.itemFG.value["category"];
  }

  setCategory(cat: string) {
    this.itemFG.get("category").setValue(cat);
  }

  saveClickHandler(): void {
    const newItem = { index: null, item: this.itemFG.value };
    this.updateItemEvent.emit(newItem);
  }
}

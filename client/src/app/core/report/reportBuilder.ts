import * as jsPDF from "jspdf";
import * as canvg from "canvg";
import {UserOptions} from "jspdf-autotable";

interface jsPDFWithPlugin extends jsPDF {
  autoTable: (options: UserOptions) => jsPDF;
}

export class ChartImage {
  readonly canvas: HTMLCanvasElement;
  readonly image: HTMLImageElement;
  readonly margin: number = 20;
  private imageLoaded: boolean = false;

  constructor(svg?: SVGElement) {
    this.canvas = document.createElement('canvas');
    this.onImageLoad = this.onImageLoad.bind(this);

    const svgString = new XMLSerializer().serializeToString(svg);
    canvg(this.canvas, svgString);

    const blob = new Blob([svgString], {type: 'image/svg+xml;charset=utf-8'});
    const url = URL.createObjectURL(blob);
    this.image = new Image();
    this.image.onload = this.onImageLoad;
    this.image.src = url;
  }

  get pngDataUrl() {
    return this.canvas.toDataURL('image/png');
  }

  private onImageLoad(): void {
    const context = this.canvas.getContext('2d');
    context.drawImage(this.image, 0, 0);
    URL.revokeObjectURL(this.image.src);
    this.imageLoaded = true;
  }
}

export class ReportBuilder {
  logo: HTMLImageElement;
  tables: UserOptions[] = [];
  charts: ChartImage[] = [];
  images: ChartImage;
  defaultTableOptions = {
    margin: {top: 250},
    theme: "striped",
    pageBreak: "auto",
    showFoot: "everyPage"
  };

  constructor() {
    this.logo = new Image();
    this.logo.src = '/assets/images/logo.png';
  }

  addChart(chart?: ChartImage) {
    this.charts.push(chart);
  }

  addTable(model: UserOptions) {
    this.tables.push(model);
  }

  print(title: string) {
    const doc = new jsPDF('l', 'px', 'A4') as jsPDFWithPlugin;

    doc.setFontSize(12);
    doc.text(title, 270, 30, '', '', 'center');

    setTimeout(() => {
      this.charts.forEach((chart: ChartImage) => {
        let scale = 1;
        const internalWidth =  doc.internal.pageSize.width - 2 * chart.margin;
        if (chart.canvas.width > internalWidth) {
          scale = internalWidth / chart.canvas.width;
        }

        if (chart.canvas.height > doc.internal.pageSize.height) {
          let verticalScale = doc.internal.pageSize.height / chart.canvas.height;
          if (verticalScale < scale) {
            scale = verticalScale;
          }
        }

        doc.addImage(chart.pngDataUrl, 'PNG', chart.margin, 50, chart.canvas.width * scale, chart.canvas.height * scale);
      });

      this.tables.forEach((tableOptions: UserOptions, index: number) => {
        doc.autoTable(
          Object.assign({...tableOptions},
            this.defaultTableOptions,
            index === 0 ? this.createHeaderAndFooter(doc) : {})
        );
      });

      doc.save('apache.pdf');
    }, 2000);
  }

  private createHeaderAndFooter(doc: jsPDFWithPlugin): UserOptions {
    return {
      didDrawPage: (data) => {
        if (this.logo) {
          doc.addImage(this.logo, 'PNG', 20, 10, 80, 30);
        }
        const pageNumber = "Página " + doc.internal.getNumberOfPages();
        if (typeof doc.putTotalPages === 'function') {
          doc.setFontSize(8);
          doc.text(pageNumber, 580, 430);
        }
      },
    } as UserOptions;
  }
}

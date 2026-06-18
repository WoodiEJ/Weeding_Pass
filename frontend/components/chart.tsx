"use client"

import * as React from "react"
import { Label, Pie, PieChart, Sector } from "recharts"
import type { PieSectorShapeProps } from "recharts/types/polar/Pie"
import {
    Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer, ChartStyle, ChartTooltip, ChartTooltipContent, type ChartConfig,
} from "@/components/ui/chart"
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"

type ChartConvidadosProps = {
    presentes: number
    ausentes: number
    total: number
}

const chartConfig = {
    presentes: {
        label: "Presentes",
        color: "var(--chart-1)",
    },
    ausentes: {
        label: "Ausentes",
        color: "var(--chart-2)",
    },
} satisfies ChartConfig

export function ChartPieConvidados({ presentes, ausentes, total }: ChartConvidadosProps) {
    const id = "pie-convidados"
    const [activeKey, setActiveKey] = React.useState<"presentes" | "ausentes">("presentes")

    const chartData = [
        { status: "presentes", quantidade: presentes, fill: "var(--color-presentes)" },
        { status: "ausentes", quantidade: ausentes, fill: "var(--color-ausentes)" },
    ]

    const activeIndex = React.useMemo(
        () => chartData.findIndex((item) => item.status === activeKey),
        [activeKey]
    )

    const renderPieShape = React.useCallback(
        ({ index, outerRadius = 0, ...props }: PieSectorShapeProps) => {
            if (index === activeIndex) {
                return (
                    <g>
                        <Sector {...props} outerRadius={outerRadius + 10} />
                        <Sector
                            {...props}
                            outerRadius={outerRadius + 25}
                            innerRadius={outerRadius + 12}
                        />
                    </g>
                )
            }
            return <Sector {...props} outerRadius={outerRadius} />
        },
        [activeIndex]
    )

    return (
        <Card data-chart={id} className="flex flex-col">
            <ChartStyle id={id} config={chartConfig} />
            <CardHeader className="flex-row items-start space-y-0 pb-0">
                <div className="grid gap-1">
                    <CardTitle>Convidados</CardTitle>
                    <CardDescription>Total: {total} convidados</CardDescription>
                </div>
                <Select value={activeKey} onValueChange={(v) => setActiveKey(v as "presentes" | "ausentes")}>
                    <SelectTrigger className="ml-auto h-7 w-[140px] rounded-lg pl-2.5">
                        <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent align="end" className="rounded-xl">
                        {(["presentes", "ausentes"] as const).map((key) => (
                            <SelectItem key={key} value={key} className="rounded-lg [&_span]:flex">
                                <div className="flex items-center gap-2 text-xs">
                                    <span
                                        className="flex h-3 w-3 shrink-0 rounded-xs"
                                        style={{ backgroundColor: `var(--color-${key})` }}
                                    />
                                    {chartConfig[key].label}
                                </div>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent className="flex flex-1 justify-center pb-0">
                <ChartContainer id={id} config={chartConfig} className="mx-auto aspect-square w-full max-w-[300px]">
                    <PieChart>
                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                        <Pie
                            data={chartData}
                            dataKey="quantidade"
                            nameKey="status"
                            innerRadius={60}
                            strokeWidth={5}
                            shape={renderPieShape}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                                                <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                                                    {chartData[activeIndex].quantidade.toLocaleString("pt-BR")}
                                                </tspan>
                                                <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                                                    {chartConfig[activeKey].label}
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}